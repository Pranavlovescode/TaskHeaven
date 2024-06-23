package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/add-manager")
public class ManagerController {

    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private EmployeeInfo employeeInfo;

    @PostMapping
    public String addManager(@RequestBody ManagerDetails managerDetails) {
        Date date = new Date();
        managerDetails.setMng_date_of_joining(date);
//        List<EmployeeDetails> emp_list = new ArrayList<>();
//        managerDetails.setEmployeeDetails(emp_list);
        managerInfo.save(managerDetails);
        return "Manager added successfully";
    }

    @GetMapping("/{id}")
    public String getEmployeeUnderManager(@PathVariable("id") String id) {
        Optional<EmployeeDetails> emp = employeeInfo.findById(id);
        if (emp.isPresent()) {
            return "Employee under manager: " + emp.get().getEmp_name();
        }
        return "No employee under this manager";

    }

//    @GetMapping
//    public String getAllEmployeeUnderManager(){
//        ManagerDetails mng_id = managerInfo.findById("55d81210-0259-4d55-a955-6bf78666eccc").get();
//
//
//        return "No employee under this manager";
//    }
}
