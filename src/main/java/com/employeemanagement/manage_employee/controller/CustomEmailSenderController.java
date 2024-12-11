/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.CustomEmailEntity;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.services.EmailService;

/**
 *
 * @author pranavtitambe
 */

@Controller
@RequestMapping("/email")
public class CustomEmailSenderController {

    static final Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());

    @Autowired
    private EmployeeInfo employeeInfo;

    @Autowired
    private ManagerInfo managerInfo;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmailToEmployee(@RequestBody CustomEmailEntity customEmailEntity) {
        // TODO: process POST request

        try {
            emailService.sendEmail(customEmailEntity.getTo(), "manager@taskheaven.pranavtitambe.in",
                    customEmailEntity.getSubject(), customEmailEntity.getBody());
            logger.log(Level.INFO, "Custom email sent to sender");
            return ResponseEntity.status(200).body("Email Sent to Sender Successfully");
        } catch (Exception e) {
            // TODO: handle exception
            logger.log(Level.WARNING, "Error occured while sending email to sender->{0}", e);
            return ResponseEntity.status(500).body("Error occured while sending email to sender");
        }

    }

}
