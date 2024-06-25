package com.employeemanagement.manage_employee.controller;


import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/add-admin")
public class AdminController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private AdminInfo adminInfo;
    @Autowired
    private EmployeeInfo employeeInfo;

    @PostMapping
    public String addAdmin(@RequestBody AdminDetails adminDetails){
        Date date = new Date();
        adminDetails.setAdm_date_of_joining(date);
        adminInfo.save(adminDetails);
        return "Admin added successfully";
    }

    @PutMapping("/{adm_id}/{emp1_id}/{emp2_id}/{emp3_id}/{emp4_id}/{emp5_id}")
    public String addEmployeeToAdmin(@PathVariable("adm_id") String mng_id, @PathVariable("emp1_id") String emp1_id, @PathVariable("emp2_id") String emp2_id, @PathVariable("emp3_id") String emp3_id, @PathVariable("emp4_id") String emp4_id, @PathVariable("emp5_id") String emp5_id) {
        AdminDetails adm = adminInfo.findById(mng_id).get();
        EmployeeDetails emp1 = employeeInfo.findById(emp1_id).get();
        EmployeeDetails emp2 = employeeInfo.findById(emp2_id).get();
        EmployeeDetails emp3 = employeeInfo.findById(emp3_id).get();
        EmployeeDetails emp4 = employeeInfo.findById(emp4_id).get();
        EmployeeDetails emp5 = employeeInfo.findById(emp5_id).get();
        List<EmployeeDetails> emp_list = new ArrayList<>();
        emp_list.add(emp1);
        emp_list.add(emp2);
        emp_list.add(emp3);
        emp_list.add(emp4);
        emp_list.add(emp5);
        for (int i = 0; i <= emp_list.indexOf(emp5); i++) {
            emp_list.get(i).setAdminDetails(adm);
            employeeInfo.save(emp_list.get(i));
        }

        logger.info("Employees added to Admin");
        return "Employees added to Admin";
    }
}
