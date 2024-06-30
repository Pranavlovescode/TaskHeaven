package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.*;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.response.AdminResponse;
import com.employeemanagement.manage_employee.response.EmployeeResponse;
import com.employeemanagement.manage_employee.response.ManagerResponse;
import com.employeemanagement.manage_employee.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.logging.Logger;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginTimeController {

    private final Logger logger = Logger.getLogger(LoginTimeController.class.getName());

    private final AuthenticationManager authenticationManager;

    private final EmployeeInfo employeeInfo;

    private final ManagerInfo managerInfo;

    private final AdminInfo adminInfo;

    private final LoginTimeInfo loginTimeInfo;

    private final BCryptPasswordEncoder bcrypt;

    private final JwtUtils jwt;



    public LoginTimeController(AuthenticationManager authenticationManager,
                               EmployeeInfo employeeInfo,
                               ManagerInfo managerInfo,
                               AdminInfo adminInfo,
                               LoginTimeInfo loginTimeInfo,
                               BCryptPasswordEncoder bcrypt, JwtUtils jwt) {
        this.authenticationManager = authenticationManager;
        this.employeeInfo = employeeInfo;
        this.managerInfo = managerInfo;
        this.adminInfo = adminInfo;
        this.loginTimeInfo = loginTimeInfo;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }



    @PostMapping("/auth/login")
    public ResponseEntity<?> createLoginTimeEmployee(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
        LoginTimeDetails loginTimeDetails = new LoginTimeDetails();

        System.out.println("Employee Details: " + employeeDetails);
        System.out.println("Admin Details: " + adminDetails);
        System.out.println("Manager Details: " + managerDetails);

        if (employeeDetails != null && bcrypt.matches(loginRequest.getPassword(), employeeDetails.getPassword())) {

            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
//            Creating a jwt token
            String jwtToken = jwt.generateToken(loginRequest.getEmail());
            Cookie jwtCookie = jwt.createCookie(jwtToken);
            // Adding jwt token to the response
            response.addCookie(jwtCookie);
            response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(employeeDetails.getEmail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("EMPLOYEE");
            loginTimeInfo.save(loginTimeDetails);
            EmployeeResponse empResponse = new EmployeeResponse(jwtToken,employeeDetails);
            logger.info("Employee Logged in Successfully!!!");
            return new ResponseEntity<>(empResponse,HttpStatus.OK);
        }

        if (adminDetails != null && bcrypt.matches(loginRequest.getPassword(), adminDetails.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwt.generateToken(loginRequest.getEmail());
            Cookie jwtCookie = jwt.createCookie(jwtToken);

            // Adding jwt token to the response
            response.addCookie(jwtCookie);
            response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(adminDetails.getAdmemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("ADMIN");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));


            // Giving custom response to the user
            AdminResponse admResponse = new AdminResponse(jwtToken,adminDetails);

            loginTimeInfo.save(loginTimeDetails);
            logger.info("Admin Logged in Successfully!!!");
            return new ResponseEntity<>(admResponse,HttpStatus.OK);
        }

        if (managerDetails != null && bcrypt.matches(loginRequest.getPassword(), managerDetails.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwt.generateToken(loginRequest.getEmail());
            Cookie jwtCookie = jwt.createCookie(jwtToken);

            // Adding jwt token to the response
            response.addCookie(jwtCookie);
            response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(managerDetails.getMngemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("MANAGER");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeInfo.save(loginTimeDetails);


            //Giving custom response to the user
            ManagerResponse mngResponse = new ManagerResponse(jwtToken,managerDetails);
            logger.info("Manager Logged in Successfully!!!");
            return new ResponseEntity<>(mngResponse,HttpStatus.OK);
        }
        logger.warning("Login failed for email: " + loginRequest.getEmail());
        return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }
}
