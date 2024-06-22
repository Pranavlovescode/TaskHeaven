package com.employeemanagement.manage_employee.controller;


import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/add-admin")
public class AdminController {

    @Autowired
    private AdminInfo adminInfo;

    @PostMapping
    public String addAdmin(@RequestBody AdminDetails adminDetails){
        Date date = new Date();
        adminDetails.setAdm_date_of_joining(date);
        adminInfo.save(adminDetails);
        return "Admin added successfully";
    }
}
