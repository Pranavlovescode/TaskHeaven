package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.entity.WorkDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.WorkInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/add-employee")
public class ManageEmployeeController {
    @Autowired
    private EmployeeInfo databaseInfo;
    @Autowired
    private ManagerInfo manager;
    @Autowired
    private AdminInfo admin;
    @Autowired
    private WorkInfo work;

    @PostMapping
    public String addEmployee(@RequestBody EmployeeDetails employeeDetails){
        Date date = new Date();
        employeeDetails.setDate_of_joining(date);
        databaseInfo.save(employeeDetails);
        return "Employee added";

    }

    @GetMapping
    public Iterable<EmployeeDetails> getEmployee(){
        return databaseInfo.findAll();
    }


}
