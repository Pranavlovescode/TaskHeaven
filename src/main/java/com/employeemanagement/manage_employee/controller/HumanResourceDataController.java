/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.HumanResourceData;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.HumanResourceInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.services.EmailService;
import com.employeemanagement.manage_employee.services.OtpCodeGenerator;
import com.employeemanagement.manage_employee.utils.CookieKUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 *
 * @author pranavtitambe
 */
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/verify")
public class HumanResourceDataController {
    private static final Logger logger = Logger.getLogger(HumanResourceDataController.class.getName());
    @Autowired
    private HumanResourceInfo humanResourceInfo;
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo managerInfo;
    // @Autowired
    // private AdminInfo adminInfo;
    // @Autowired
    // private EmployeeDetails employeeDetails;
    // @Autowired
    // private ManagerDetails managerDetails;
    // @AutowiredmanagerDetails
    // private AdminDetails adminDetails;
    @Autowired
    private EmailService javaMailService;

    @Autowired
    private CookieKUtils cookieUtils;

    @PostMapping("/save/human-resource")
    public ResponseEntity<?> saveHumanResourceData(@RequestBody HumanResourceData humanResourceData) {

        Date date = new Date();
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String hr_passString = bcrypt.encode(humanResourceData.getHr_password());
        humanResourceData.setHr_password(hr_passString);
        humanResourceData.setHr_doj(date);
        humanResourceData.setAdmin_verified("PENDING");

        // OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        // String otp = otpGenerator.generateOTP();
        humanResourceInfo.save(humanResourceData);
        javaMailService.sendEmail(humanResourceData.getHremail(), "Registration Complete",
                "Congratulations! You have successfully registered. Your registration will soon be verified by our HR team. Once the verification is successfull you will be notified to verify your email.");

        return new ResponseEntity<>(humanResourceData, null, 200);
    }

    @PostMapping("/employee/{id}")
    public ResponseEntity<?> verifyEmployeeEntity(@PathVariable String id, HttpServletRequest request,HttpServletResponse response) {
        HumanResourceData humanResourceData = humanResourceInfo.findById(id).get();
        logger.log(Level.INFO, "Received hr_id: {0}", id);

        // Check if the human resource data exists
        if (humanResourceData == null) {
            logger.log(Level.WARNING, "Human Resource with ID {0} not found.", id);
            return ResponseEntity.status(404).body("Human Resource with ID " + id + " not found.");
        }

        // HumanResourceData humanResourceData = humanResourceDataOptional.get();
        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();

        EmployeeDetails employeeDetails = new EmployeeDetails();
        employeeDetails.setAddress(humanResourceData.getHr_address());
        employeeDetails.setMobile_number(humanResourceData.getHr_contact());
        employeeDetails.setEmail(humanResourceData.getHremail());
        employeeDetails.setName(humanResourceData.getHr_name());
        employeeDetails.setRole("EMPLOYEE");
        employeeDetails.setPassword(humanResourceData.getHr_password());
        employeeDetails.setAge(humanResourceData.getHr_age());
        employeeDetails.setDate_of_joining(humanResourceData.getHr_doj());
        employeeDetails.setIs_verified("PENDING");
        employeeDetails.setEmp_dessignation(humanResourceData.getHr_designation());

        humanResourceData.setAdmin_verified("VERIFIED");

        try {
            humanResourceInfo.save(humanResourceData);
            employeeInfo.save(employeeDetails);
            // Storing OTP in sessions for verification.
            HttpSession session = request.getSession();
            session.setAttribute(employeeDetails.getEmail(), otp);

            response.addCookie(cookieUtils.createCookie(otp,"cookie_otp"));


            logger.log(Level.INFO, "Set OTP for email {0}: {1}, Session ID: {2}",
                    new Object[] { employeeDetails.getEmail(), otp, session.getId() });
            javaMailService.sendEmail(
                    employeeDetails.getEmail(),
                    "Verification Complete",
                    "You have been successfully verified as an " + humanResourceData.getHr_role() +
                            ". Now click on the link to verify your email: http://localhost:3000/register/verify-email. "
                            +
                            "Your OTP for verification is " + otp);
            logger.log(Level.INFO, "Employee verification successful");

            return ResponseEntity.ok(employeeDetails);

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error processing HR verification", e);
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }

    @PostMapping("/manager/{hr_id}")
    public ResponseEntity<?> verifyManagerEntity(@PathVariable String hr_id, HttpServletRequest request, HttpServletResponse response) {
        HumanResourceData humanResourceData = humanResourceInfo.findById(hr_id).get();

        if (humanResourceData == null) {
            return ResponseEntity.status(404).body("Human Resource with ID " + hr_id + " not found.");
        }

        // HumanResourceData humanResourceData = humanResourceDataOptional.get();
        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();

        ManagerDetails managerDetails = new ManagerDetails();
        managerDetails.setAddress(humanResourceData.getHr_address());
        managerDetails.setMobile_number(humanResourceData.getHr_contact());
        managerDetails.setMngemail(humanResourceData.getHremail());
        managerDetails.setName(humanResourceData.getHr_name());
        managerDetails.setRole("MANAGER");
        managerDetails.setPassword(humanResourceData.getHr_password());
        managerDetails.setAge(humanResourceData.getHr_age());
        managerDetails.setDate_of_joining(humanResourceData.getHr_doj());
        managerDetails.setIs_verified("PENDING");
        managerDetails.setMng_designation(humanResourceData.getHr_designation());
        humanResourceData.setAdmin_verified("VERIFIED");

        try {
            managerInfo.save(managerDetails);
            humanResourceInfo.save(humanResourceData);

            // Storing OTP in sessions for verification.
            HttpSession session = request.getSession();
            session.setAttribute("cookie_otp", otp);
            
            response.addCookie(cookieUtils.createCookie(otp,"cookie_otp"));

            logger.log(Level.INFO, "Set OTP for email {0}: {1}, Session ID: {2}",
                    new Object[] { managerDetails.getMngemail(), otp, session.getId() });
            // Send email to manager
            javaMailService.sendEmail(
                    managerDetails.getMngemail(),
                    "Verification Complete",
                    "You have been successfully verified as an " + humanResourceData.getHr_role() +
                            ". Now click on the link to verify your email: http://localhost:3000/register/verify-email. "
                            +
                            "Your OTP for verification is " + otp);

            logger.log(Level.INFO, "Manager verification successful");

            return ResponseEntity.ok(managerDetails);
        } catch (Exception e) {
            // TODO: handle exception
            logger.log(Level.SEVERE, "Error processing HR verification", e);
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }

    @GetMapping("/get-hr")
    public ResponseEntity<?> getMethodName() {
        return new ResponseEntity<>(humanResourceInfo.findAll(), null, 200);
    }

    @PostMapping("/otp/{email}/{enteredOtp}")
    public ResponseEntity<?> verifyOTP(@PathVariable String email, @PathVariable String enteredOtp,
            HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        String sessionOtp = (String) session.getAttribute(email);
        String storedOtp = (String) cookieUtils.getCookie(request, "cookie_otp").getValue();

        logger.log(Level.INFO, "Retrieved OTP from session for email {0}: {1}", new Object[] { email, sessionOtp });
        logger.log(Level.INFO, "Retrieving OTP from Session ID: {0}", session.getId());

        if (storedOtp==null) {
            return ResponseEntity.status(404).body("No OTP found for the provided email.");
        }

        if (enteredOtp.equals(sessionOtp)) {
            session.removeAttribute(email); // Clear OTP after successful verification
            logger.log(Level.INFO, "OTP verified successfully for email {0}", email);
            cookieUtils.deleteCookie(cookieUtils.getCookie(request, "cookie_otp"));
            return ResponseEntity.ok("OTP verified successfully.");
        }

        logger.log(Level.WARNING, "Invalid OTP entered for email {0}", email);
        return ResponseEntity.status(401).body("Invalid OTP.");
    }

}
