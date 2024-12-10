/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.LeaveDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LeaveInfo;
import com.employeemanagement.manage_employee.services.EmailService;

/**
 *
 * @author pranav titambe
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/leave")
public class LeaveController {

    static final Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());

    @Autowired
    private LeaveInfo leaveInfo;
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private EmailService emailService;

    @GetMapping("")
    public ResponseEntity<?> getAllLeave() {
        try {
            logger.log(Level.INFO, "Getting all leave details ->{0}", leaveInfo.findAll());
            return ResponseEntity.status(200).body(leaveInfo.findAll());
        } catch (Exception e) {
            // TODO: handle exception

            logger.log(Level.WARNING, "Error occured while getting all leave details->{0}", e);
            return ResponseEntity.status(500).body("Error occured while getting all leave details");
        }
    }

    @PostMapping("/add-leave")
    public ResponseEntity<?> addLeaveToDatabase(@RequestBody LeaveDetails leaveDetails, @RequestParam String email) {
        // TODO: process POST request
        try {
            if (email.isEmpty() || leaveDetails == null) {
                logger.log(Level.WARNING, "Email or leave details cannot be empty");
                return ResponseEntity.status(400).body("Email or leave details cannot be empty");
            } else {
                EmployeeDetails emp = employeeInfo.findByEmail(email);
                leaveDetails.setEmployeeDetails(emp);
                leaveInfo.save(leaveDetails);
                emailService.sendEmail(email, "Leave message notified to Manager",
                        "Your Leave is notified to Manager. Please wait for the approval");
                logger.log(Level.INFO, "Leave added successfully->{0}", leaveDetails);
                return ResponseEntity.status(200).body(leaveDetails);
            }
        } catch (Exception e) {
            // TODO: handle exception
            logger.log(Level.WARNING, "Error occured while adding leave to the database->{0}", e);
            return ResponseEntity.status(500).body("Error occured while adding leave to the database");
        }
    }

    @PutMapping("/change-status")
    public ResponseEntity<?> changeStatusOfTheRequest(@RequestParam String leave_id, @RequestParam String status) {
        // TODO: process PUT request
        try {
            LeaveDetails leave = leaveInfo.findById(leave_id).get();
            leave.setStatus(status);
            leaveInfo.save(leave);
            if (status.equals("Approved")) {

                emailService.sendEmail(leave.getEmployeeDetails().getEmail(), "Leave Approved",
                        "Your leave status has been changed to " + status);
            } else {

                emailService.sendEmail(leave.getEmployeeDetails().getEmail(), "Leave Rejected",
                        "Your leave status has been changed to " + status);
            }
            logger.log(Level.INFO, "Leave status changed->{0}", leave);
            return ResponseEntity.status(200).body(leave);
        } catch (Exception e) {
            logger.log(Level.WARNING, "Error occured while changing the status of the leave->{0}", e);
            return ResponseEntity.status(500).body("Error occured while changing the status of the leave");
        }

    }

}
