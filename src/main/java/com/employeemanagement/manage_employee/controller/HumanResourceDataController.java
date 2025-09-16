/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.HumanResourceData;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.HumanResourceInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.services.EmailService;
import com.employeemanagement.manage_employee.services.OtpCodeGenerator;
import com.employeemanagement.manage_employee.utils.CookieUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 *
 * @author pranavtitambe
 */
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
    @Autowired
    private AdminInfo adminInfo;
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
    private CookieUtils cookieUtils;

    @Value("${app.frontend.url}")
    private String frontEndUrl;

    @Transactional
    @PostMapping("/save/human-resource")
    public ResponseEntity<?> saveHumanResourceData(@RequestBody HumanResourceData humanResourceData) {
        if (frontEndUrl == null || frontEndUrl.isEmpty()) {
            logger.log(Level.WARNING, "Property 'app.frontend.url' is not set. Please check your configuration.");
        }

        Date date = new Date();
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String hr_passString = bcrypt.encode(humanResourceData.getHr_password());
        humanResourceData.setHr_password(hr_passString);
        humanResourceData.setHr_doj(date);
        humanResourceData.setAdmin_verified("PENDING");

        // OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        // String otp = otpGenerator.generateOTP();
        humanResourceInfo.save(humanResourceData);
        javaMailService.sendEmail(humanResourceData.getHremail(), "admin@pranavtitambe.in","Registration Complete",
                "Congratulations! You have successfully registered. Your registration will soon be verified by our HR team. Once the verification is successfull you will be notified to verify your email.");

        return new ResponseEntity<>(humanResourceData, null, 200);
    }

    @Transactional
    @PostMapping("/employee/{id}/{adm_id}")
    public ResponseEntity<?> verifyEmployeeEntity(@PathVariable String id, @PathVariable String adm_id,HttpServletRequest request,
            HttpServletResponse response) {
        System.out.println("Id "+id);
        Optional<HumanResourceData> hrOptional = humanResourceInfo.findById(id);
        logger.log(Level.INFO, "Received hr_id: {0}", id);

        // Check if the human resource data exists
        if (!hrOptional.isPresent()) {
            logger.log(Level.WARNING, "Human Resource with ID {0} not found.", id);
            return ResponseEntity.status(404).body("Human Resource with ID " + id + " not found.");
        }
        HumanResourceData humanResourceData = hrOptional.get();

        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();

        // Getting the admin details from the path variable
        Optional<AdminDetails> adminOptional = adminInfo.findById(adm_id);
        if (!adminOptional.isPresent()) {
            logger.log(Level.WARNING, "Admin with ID {0} not found.", adm_id);
            return ResponseEntity.status(404).body("Admin with ID " + adm_id + " not found.");
        }
        AdminDetails adminDetails = adminOptional.get();

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
        employeeDetails.setAdminDetails(adminDetails);

        humanResourceData.setAdmin_verified("VERIFIED");

        try {
            humanResourceInfo.save(humanResourceData);
            employeeInfo.save(employeeDetails);
            // Storing OTP in sessions for verification.
            HttpSession session = request.getSession();
            session.setAttribute(employeeDetails.getEmail(), otp);

            response.addCookie(cookieUtils.createCookie(otp, "cookie_otp",request));

            logger.log(Level.INFO, "Set OTP for email {0}: {1}, Session ID: {2}",
                    new Object[] { employeeDetails.getEmail(), otp, session.getId() });

            System.out.println(frontEndUrl);
            
            String body = "You have been successfully verified as an " + humanResourceData.getHr_role() + ". " +
                      "Now click on the link to verify your email: " + frontEndUrl + "/register/verify-email. " +
                      "Your OTP for verification is " + otp;

            
            javaMailService.sendEmail(
                    employeeDetails.getEmail(),
                    "admin@pranavtitambe.in",
                    "Verification Complete",
                    body);
            logger.log(Level.INFO, "Employee verification successful");

            return ResponseEntity.ok(employeeDetails);

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error processing HR verification", e);
            return ResponseEntity.status(500).body("An error occurred while processing the request.");
        }
    }

    @Transactional
    @PostMapping("/manager/{hr_id}/{adm_id}")
    public ResponseEntity<?> verifyManagerEntity(@PathVariable String hr_id, @PathVariable String adm_id, HttpServletRequest request,
            HttpServletResponse response) {
        Optional<HumanResourceData> hrOptional = humanResourceInfo.findById(hr_id);

        if (!hrOptional.isPresent()) {
            return ResponseEntity.status(404).body("Human Resource with ID " + hr_id + " not found.");
        }
        HumanResourceData humanResourceData = hrOptional.get();

        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();

        // Check if the admin details exist
        Optional<AdminDetails> adminOptional = adminInfo.findById(adm_id);
        if (!adminOptional.isPresent()) {
            logger.log(Level.WARNING, "Admin with ID {0} not found.", adm_id);
            return ResponseEntity.status(404).body("Admin with ID " + adm_id + " not found.");
        }
        AdminDetails adminDetails = adminOptional.get();

        try {
            // Check if a manager with this email already exists
            ManagerDetails managerDetails = managerInfo.findByMngemail(humanResourceData.getHremail());
            boolean isExistingManager = managerDetails != null;
            
            if (!isExistingManager) {
                // Create new manager if not found
                managerDetails = new ManagerDetails();
            }
            
            // Set or update manager details
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
            managerDetails.setAdminDetails(adminDetails);
            
            // Update HR status
            humanResourceData.setAdmin_verified("VERIFIED");
            
            // Save the entities
            managerInfo.save(managerDetails);
            humanResourceInfo.save(humanResourceData);

            // Storing OTP in sessions for verification.
            HttpSession session = request.getSession();
            session.setAttribute(managerDetails.getMngemail(), otp); // Store with email as key
            session.setAttribute("cookie_otp", otp);

            response.addCookie(cookieUtils.createCookie(otp, "cookie_otp", request));

            logger.log(Level.INFO, "Set OTP for email {0}: {1}, Session ID: {2}",
                    new Object[] { managerDetails.getMngemail(), otp, session.getId() });
            
            String body = "You have been successfully verified as an " + humanResourceData.getHr_role() + ". " +
                      "Now click on the link to verify your email: " + frontEndUrl + "/register/verify-email. " +
                      "Your OTP for verification is " + otp;
            // Send email to manager
            javaMailService.sendEmail(
                    managerDetails.getMngemail(),
                    "admin@pranavtitambe.in",
                    "Verification Complete",
                    body);

            logger.log(Level.INFO, "Manager verification successful");

            return ResponseEntity.ok(managerDetails);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error processing HR verification: {0}", e.getMessage());
            return ResponseEntity.status(500).body("An error occurred while processing the request: " + e.getMessage());
        }
    }

    @GetMapping("/get-hr")
    public ResponseEntity<?> getMethodName() {
        // return new ResponseEntity<>(humanResourceInfo.findAll(), null, 200);
        List<HumanResourceData> adminList = (List<HumanResourceData>) humanResourceInfo.findAll();
        List<HumanResourceData> pending = new ArrayList<>();
        for (HumanResourceData admin : adminList) {
            if(admin.getAdmin_verified().equals("PENDING")){
                pending.add(admin);
            }
        }
        return new ResponseEntity<>(pending, null, 200);
    }

    @Transactional
    @PostMapping("/otp/{email}/{enteredOtp}")
    public ResponseEntity<?> verifyOTP(@PathVariable String email, @PathVariable String enteredOtp,
            HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession();
        String sessionOtp = (String) session.getAttribute(email);
        String storedOtp = null;
        
        try {
            storedOtp = (String) cookieUtils.getCookie(request, "cookie_otp").getValue();
        } catch (Exception e) {
            logger.log(Level.WARNING, "Failed to retrieve OTP cookie: {0}", e.getMessage());
        }

        logger.log(Level.INFO, "Retrieved OTP from session for email {0}: {1}", new Object[] { email, sessionOtp });
        logger.log(Level.INFO, "Retrieving OTP from Session ID: {0}", session.getId());

        if (sessionOtp == null && storedOtp == null) {
            return ResponseEntity.status(404).body("No OTP found for the provided email.");
        }

        if ((sessionOtp != null && enteredOtp.equals(sessionOtp)) || (storedOtp != null && enteredOtp.equals(storedOtp))) {
            session.removeAttribute(email); // Clear OTP after successful verification
            session.removeAttribute("cookie_otp"); // Clear cookie OTP after successful verification
            
            try {
                HumanResourceData hr = humanResourceInfo.findByHremail(email);
                if (hr != null && "employee".equals(hr.getHr_role())) {
                    EmployeeDetails employeeDetails = employeeInfo.findByEmail(email);
                    if (employeeDetails != null) {
                        employeeDetails.setIs_verified("VERIFIED");
                        employeeInfo.save(employeeDetails);
                    }
                } else {
                    ManagerDetails managerDetails = managerInfo.findByMngemail(email);
                    if (managerDetails != null) {
                        managerDetails.setIs_verified("VERIFIED");
                        managerInfo.save(managerDetails);
                    }
                }
                
                logger.log(Level.INFO, "OTP verified successfully for email {0}", email);
                
                if (cookieUtils.getCookie(request, "cookie_otp") != null) {
                    cookieUtils.deleteCookie(cookieUtils.getCookie(request, "cookie_otp"), response, request);
                }
                
                return ResponseEntity.ok("OTP verified successfully.");
            } catch (Exception e) {
                logger.log(Level.SEVERE, "Error during verification: {0}", e.getMessage());
                return ResponseEntity.status(500).body("Error during verification: " + e.getMessage());
            }
        }

        logger.log(Level.WARNING, "Invalid OTP entered for email {0}", email);
        return ResponseEntity.status(401).body("Invalid OTP.");
    }

}
