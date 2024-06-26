package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.*;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.logging.Logger;


@RestController
@RequestMapping("/work-time")
public class LoginTimeController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());

    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private AdminInfo adminInfo;
    @Autowired
    private LoginTimeInfo loginTimeInfo;

//    Adding login time of employee
    @PostMapping("/login-time-emp")
    public String createLoginTimeEmployee(@RequestBody LoginRequest loginRequest){
        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        EmployeeDetails employeeDetails1 = employeeInfo.findByPassword(loginRequest.getPassword());
        System.out.println(employeeInfo.findByEmail(loginRequest.getEmail()));

        if (employeeDetails1 != null && employeeDetails != null) {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
            loginTimeDetails.setLogin_time(timestamp);
            loginTimeDetails.setEmployeeDetails(employeeDetails);
            loginTimeInfo.save(loginTimeDetails);
            return "timestamp";
        }
        return "No employee found with this email";
    }

//    Adding login time of admin
    @PostMapping("/login-time-adm")
    public String createLoginTimeAdmin(@RequestBody LoginRequest loginRequest){
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        AdminDetails adminDetails1 = adminInfo.findByPassword(loginRequest.getPassword());
        System.out.println(adminInfo.findByAdmemail(loginRequest.getEmail()));
        if(adminDetails != null && adminDetails1 != null){
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
            loginTimeDetails.setLogin_time(timestamp);
            loginTimeDetails.setAdminDetails(adminDetails);
            loginTimeInfo.save(loginTimeDetails);
            return "timestamp";
        }
        return "No Admin found with this email";
    }

//    Adding login time of manager
    @PostMapping("/login-time-mng")
        public String createLoginTimeManager(@RequestBody LoginRequest loginRequest){
            ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
            ManagerDetails managerDetails1 = managerInfo.findByPassword(loginRequest.getPassword());
            System.out.println(managerInfo.findByMngemail(loginRequest.getEmail()));
            if(managerDetails != null && managerDetails1 != null){
                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                LoginTimeDetails loginTimeDetails = new LoginTimeDetails();
                loginTimeDetails.setLogin_time(timestamp);
                loginTimeDetails.setManagerDetails(managerDetails);
                loginTimeInfo.save(loginTimeDetails);
                return "timestamp";
            }
            return "No employee found with this email";
        }


}
