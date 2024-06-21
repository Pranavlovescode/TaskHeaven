package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/add-manager")
public class ManagerController {

    @Autowired
    private ManagerInfo managerInfo;

    @PostMapping
    public String addManager(@RequestBody ManagerDetails managerDetails){
        Date date = new Date();
        managerDetails.setMng_date_of_joining(date);
        managerInfo.save(managerDetails);
        return "Manager added successfully";
    }
}
