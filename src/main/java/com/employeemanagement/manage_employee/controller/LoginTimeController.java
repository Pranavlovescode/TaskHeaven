package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.*;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.logging.Logger;


@RestController
@RequestMapping("/api/auth")
public class LoginTimeController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private AdminInfo adminInfo;
    @Autowired
    private LoginTimeInfo loginTimeInfo;

//    Adding login time of employee
    @PostMapping("/login-emp")
    public String createLoginTimeEmployee(@RequestBody LoginRequest loginRequest){
        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        EmployeeDetails employeeDetails1 = employeeInfo.findByPassword(loginRequest.getPassword());
        System.out.println(employeeInfo.findByEmail(loginRequest.getEmail()));
        System.out.println(employeeInfo.findByPassword(bcrypt.encode(loginRequest.getPassword())));
        if (employeeDetails != null && bcrypt.matches(loginRequest.getPassword(), employeeDetails.getPassword())) {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
            loginTimeDetails.setLogin_time(timestamp);
            loginTimeDetails.setEmail(loginRequest.getEmail());
            loginTimeDetails.setPassword(new BCryptPasswordEncoder().encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("EMPLOYEE");
            loginTimeDetails.setEmployeeDetails(employeeDetails);
            loginTimeInfo.save(loginTimeDetails);
            return "timestamp";
        }
        return "No employee found with this email";
    }

//    Adding login time of admin
    @PostMapping("/login-adm")
    public String createLoginTimeAdmin(@RequestBody LoginRequest loginRequest){
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        AdminDetails adminDetails1 = adminInfo.findByPassword(loginRequest.getPassword());

        System.out.println(adminInfo.findByAdmemail(loginRequest.getEmail()));
        if(adminDetails != null && bcrypt.matches(loginRequest.getPassword(), adminDetails.getPassword())){
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
            loginTimeDetails.setLogin_time(timestamp);
            loginTimeDetails.setEmail(loginRequest.getEmail());
            loginTimeDetails.setPassword(new BCryptPasswordEncoder().encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("ADMIN");
            loginTimeDetails.setAdminDetails(adminDetails);
            loginTimeInfo.save(loginTimeDetails);
            return "timestamp";
        }
        return "No Admin found with this email";
    }

//    Adding login time of manager
    @PostMapping("/login-mng")
    public String createLoginTimeManager(@RequestBody LoginRequest loginRequest){
        ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
        ManagerDetails managerDetails1 = managerInfo.findByPassword(loginRequest.getPassword());
        System.out.println(managerInfo.findByMngemail(loginRequest.getEmail()));
        System.out.println(managerInfo.findByPassword(loginRequest.getPassword()));
        if(managerDetails != null && bcrypt.matches(loginRequest.getPassword(), managerDetails.getPassword())){
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
            loginTimeDetails.setLogin_time(timestamp);
            loginTimeDetails.setEmail(loginRequest.getEmail());
            loginTimeDetails.setPassword(new BCryptPasswordEncoder().encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("MANAGER");
            loginTimeDetails.setManagerDetails(managerDetails);
            loginTimeInfo.save(loginTimeDetails);
            return "timestamp";
        }
        return "No Manager found with this email";
    }


}
