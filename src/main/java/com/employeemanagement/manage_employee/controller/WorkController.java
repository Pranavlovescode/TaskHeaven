package com.employeemanagement.manage_employee.controller;


import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.entity.WorkDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.WorkInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Logger;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/add-work")
public class WorkController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private WorkInfo workInfo;
    @Autowired
    private ManagerInfo manager;
    @Autowired
    private EmployeeInfo employee;


//    Adding work to the database along with reference to manager and employee
    @PostMapping("/{mng_id}/{emp_id}")
    public String addWork(@RequestBody WorkDetails workDetails, @PathVariable("mng_id") String mng_id,@PathVariable("emp_id") String emp_id){
        Date date = new Date();
        workDetails.setAlloted_time(new Timestamp(date.getTime()));
        ManagerDetails mng = manager.findById(mng_id).get();
        EmployeeDetails emp = employee.findById(emp_id).get();
        workDetails.setManagerDetails(mng);
        emp.setWorkDetails(workDetails);
        workInfo.save(workDetails);
        employee.save(emp);
        logger.info("Work added successfully");
        return "Work added successfully";
    }
}
