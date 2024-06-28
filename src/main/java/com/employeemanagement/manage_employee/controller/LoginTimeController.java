package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.*;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class LoginTimeController {

    private final Logger logger = Logger.getLogger(LoginTimeController.class.getName());

//    @Autowired
//    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeInfo employeeInfo;

    @Autowired
    private ManagerInfo managerInfo;

    @Autowired
    private AdminInfo adminInfo;

    @Autowired
    private LoginTimeInfo loginTimeInfo;

    @Autowired
    private BCryptPasswordEncoder bcrypt;

    @PostMapping("/auth/login")
    public ResponseEntity<String> createLoginTimeEmployee(@RequestBody LoginRequest loginRequest) {
        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
        LoginTimeDetails loginTimeDetails = new LoginTimeDetails();

        System.out.println("Employee Details: " + employeeDetails);
        System.out.println("Admin Details: " + adminDetails);
        System.out.println("Manager Details: " + managerDetails);

        if (employeeDetails != null && bcrypt.matches(loginRequest.getPassword(), employeeDetails.getPassword())) {
            loginTimeDetails.setEmail(employeeDetails.getEmail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("EMPLOYEE");
            loginTimeInfo.save(loginTimeDetails);

//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.info("Employee Logged in Successfully!!!");
            return ResponseEntity.ok("Employee Logged in Successfully!!!");
        }

        if (adminDetails != null && bcrypt.matches(loginRequest.getPassword(), adminDetails.getPassword())) {
            loginTimeDetails.setEmail(adminDetails.getAdmemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("ADMIN");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeInfo.save(loginTimeDetails);
//
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.info("Admin Logged in Successfully!!!");
            return ResponseEntity.ok("Admin Logged in Successfully!!!");
        }

        if (managerDetails != null && bcrypt.matches(loginRequest.getPassword(), managerDetails.getPassword())) {
            loginTimeDetails.setEmail(managerDetails.getMngemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("MANAGER");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeInfo.save(loginTimeDetails);

//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.info("Manager Logged in Successfully!!!");
            return ResponseEntity.ok("Manager Logged in Successfully!!!");
        }

        logger.warning("Login failed for email: " + loginRequest.getEmail());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
}
