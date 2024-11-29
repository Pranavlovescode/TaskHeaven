/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.HumanResourceData;
import com.employeemanagement.manage_employee.repository.HumanResourceInfo;
import com.employeemanagement.manage_employee.services.EmailService;


/**
 *
 * @author pranavtitambe
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reject")
public class RejectRegisteredUser {
    @Autowired
    private EmailService javaMailService;
    @Autowired
    private HumanResourceInfo humanResourceInfo;

    @PostMapping("/user/{id}")
    public ResponseEntity<?> rejectUserEntity(@PathVariable String id) {
        //TODO: process POST request
        HumanResourceData humanResourceData = humanResourceInfo.findById(id).get();
        javaMailService.sendEmail(humanResourceData.getHremail(), "Registration Rejected", "Your registration has been rejected by the admin. Please contact the admin for more details.");
        return ResponseEntity.status(200).body("User Rejected");
    }
    
}
