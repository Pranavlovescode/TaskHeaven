package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.*;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class LoginTimeController {

    private final Logger logger = Logger.getLogger(LoginTimeController.class.getName());

    @Autowired
    private EmployeeInfo employeeInfo;

    @Autowired
    private ManagerInfo managerInfo;

    @Autowired
    private AdminInfo adminInfo;

    @Autowired
    private LoginTimeInfo loginTimeInfo;

    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    @PostMapping("/auth/login")
    public ResponseEntity<String> createLoginTimeEmployee(@RequestBody LoginRequest loginRequest) {
        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
        LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
        System.out.println("Employee Details: " + employeeDetails);
        System.out.println("Admin Details: " + adminDetails);
        System.out.println("Manager Details: " + managerDetails);
        if (employeeDetails != null && bcrypt.matches(loginRequest.getPassword(), employeeInfo.findByEmail(loginRequest.getEmail()).getPassword())) {
            loginTimeDetails.setEmployeeDetails(employeeDetails);
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setEmail(employeeDetails.getEmail());
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("EMPLOYEE");
            loginTimeInfo.save(loginTimeDetails);
            logger.info("Employee Logged in Successfully!!!");
            return ResponseEntity.ok("Employee Logged in Successfully!!!");
        }

        if (adminDetails != null && bcrypt.matches(loginRequest.getPassword(), adminInfo.findByAdmemail(loginRequest.getEmail()).getPassword())) {
            loginTimeDetails.setAdminDetails(adminDetails);
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setEmail(adminDetails.getAdmemail());
            loginTimeDetails.setPassword(bcrypt.encode(adminDetails.getPassword()));
            loginTimeDetails.setRole("ADMIN");
            loginTimeInfo.save(loginTimeDetails);
            logger.info("Admin Logged in Successfully!!!");
            return ResponseEntity.ok("Admin Logged in Successfully!!!");
        }

        if (managerDetails != null && bcrypt.matches(loginRequest.getPassword(),managerInfo.findByMngemail(loginRequest.getEmail()).getPassword())) {
            loginTimeDetails.setManagerDetails(managerDetails);
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setEmail(managerDetails.getMngemail());
            loginTimeDetails.setPassword(bcrypt.encode(managerDetails.getPassword()));
            loginTimeDetails.setRole("MANAGER");
            loginTimeInfo.save(loginTimeDetails);
            logger.info("Manager Logged in Successfully!!!");
            return ResponseEntity.ok("Manager Logged in Successfully!!!");
        }

        logger.warning("Login failed for email: " + loginRequest.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }


}
