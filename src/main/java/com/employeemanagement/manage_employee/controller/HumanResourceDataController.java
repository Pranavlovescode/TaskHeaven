/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.HumanResourceData;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.HumanResourceInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.services.EmailService;
import com.employeemanagement.manage_employee.services.OtpCodeGenerator;

/**
 *
 * @author pranavtitambe
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/verify")
public class HumanResourceDataController {

    @Autowired
    private HumanResourceInfo humanResourceInfo;
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private AdminInfo adminInfo;
    // @Autowired
    // private EmployeeDetails employeeDetails;
    // @Autowired
    // private ManagerDetails managerDetails;
    // @AutowiredmanagerDetails
    // private AdminDetails adminDetails;
    @Autowired
    private EmailService javaMailService;

    @PostMapping("/save/human-resource")
    public ResponseEntity<?> saveHumanResourceData(@RequestBody HumanResourceData humanResourceData) {
        Date date = new Date();
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String hr_passString = bcrypt.encode(humanResourceData.getHr_password());
        humanResourceData.setHr_password(hr_passString);
        humanResourceData.setHr_doj(date);
        // OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        // String otp = otpGenerator.generateOTP();
        humanResourceInfo.save(humanResourceData);
        javaMailService.sendEmail(humanResourceData.getHr_email(), "Registration Complete",
                "Congratulations! You have successfully registered. Your registration will soon be verified by our HR team. Once the verification is successfull you will be notified to verify your email.");
        
        return new ResponseEntity<>(humanResourceData, null, 200);
    }

    @PostMapping("/employee")
    public ResponseEntity<?> verifyEmployeeEntity(@RequestBody HumanResourceData humanResourceData) {

        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();
        EmployeeDetails employeeDetails = new EmployeeDetails();
        employeeDetails.setAddress(humanResourceData.getHr_address());
        employeeDetails.setMobile_number(humanResourceData.getHr_contact());
        employeeDetails.setEmail(humanResourceData.getHr_email());
        employeeDetails.setName(humanResourceData.getHr_name());
        employeeDetails.setEmp_dessignation(humanResourceData.getHr_designation());
        employeeDetails.setRole("EMPLOYEE");
        employeeDetails.setPassword(humanResourceData.getHr_password());
        employeeDetails.setAge(humanResourceData.getHr_age());
        employeeDetails.setDate_of_joining(humanResourceData.getHr_doj());
        employeeInfo.save(employeeDetails);
        javaMailService.sendEmail(employeeDetails.getEmail(), "Verification Complete",
                "You have been successfully verified as an" + humanResourceData.getHr_role()
                        + ". Now click on link to verify your email. http://localhost:3000/register/verify-email. Your OTP for verification is "
                        + otp);
        
        return new ResponseEntity<>(employeeDetails, null, 200);
    }

    @PostMapping("/manager")
    public ResponseEntity<?> verifyManagerEntity(@RequestBody HumanResourceData humanResourceData) {

        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String hr_passString = bcrypt.encode(humanResourceData.getHr_password());
        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();
        ManagerDetails managerDetails = new ManagerDetails();
        managerDetails.setAddress(humanResourceData.getHr_address());
        managerDetails.setMobile_number(humanResourceData.getHr_contact());
        managerDetails.setMngemail(humanResourceData.getHr_email());
        managerDetails.setName(humanResourceData.getHr_name());
        managerDetails.setRole("MANAGER");
        managerDetails.setPassword(hr_passString);
        managerDetails.setAge(humanResourceData.getHr_age());
        managerDetails.setDate_of_joining(humanResourceData.getHr_doj());
        managerInfo.save(managerDetails);
        javaMailService.sendEmail(humanResourceData.getHr_email(), "Verification Complete",
                "You have been successfully verified as an Manager. Now click on link to verify your email. http://localhost:3000/register/verify-email. Your OTP for verification is "
                        + otp);

        return new ResponseEntity<>(managerDetails, null, 200);
    }

}
