package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/add-user")
public class ManageEmployeeController {
    @Autowired
    private EmployeeInfo databaseInfo;

    @PostMapping
    public String addEmployee(@RequestBody EmployeeDetails employeeDetails){
        Date date = new Date();
        employeeDetails.setDate_of_joining(date);
        databaseInfo.save(employeeDetails);
        return "Employee added successfully";

    }

}
