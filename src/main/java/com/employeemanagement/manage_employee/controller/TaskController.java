package com.employeemanagement.manage_employee.controller;


import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.entity.TaskDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.TaskInfo;
import com.employeemanagement.manage_employee.response.TaskAssignmentResponse;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/add-work")
public class TaskController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private TaskInfo taskInfo;
    @Autowired
    private ManagerInfo manager;
    @Autowired
    private EmployeeInfo employee;
    @Autowired
    private AdminInfo admin;


//    Adding work to the database along with reference to manager and employee
    @PostMapping("/{mng_id}/{emp_id}")
    public ResponseEntity<?> addWork(@RequestBody TaskDetails taskDetails, @PathVariable("mng_id") String mng_id,@PathVariable("emp_id") String emp_id){
        Date date = new Date();
        taskDetails.setAlloted_time(new Timestamp(date.getTime()));
        ManagerDetails mng = manager.findById(mng_id).get();
        EmployeeDetails emp = employee.findById(emp_id).get();
        taskDetails.setManagerDetails(mng);
        emp.setTaskDetails(taskDetails);
        taskInfo.save(taskDetails);
        employee.save(emp);
        logger.info("Work added successfully");
        TaskAssignmentResponse response = new TaskAssignmentResponse(taskDetails);
        return ResponseEntity.ok(response);
    }
    // @PostMapping("/{adm_id}/{emp_id}")
    // public ResponseEntity<?> addWorkByAdmin(@RequestBody TaskDetails taskDetails, @PathVariable("adm_id") String adm_id,@PathVariable("emp_id") String emp_id){
    //     Date date = new Date();
    //     taskDetails.setAlloted_time(new Timestamp(date.getTime()));
    //     AdminDetails adm = admin.findById(adm_id).get();
    //     EmployeeDetails emp = employee.findById(emp_id).get();
    //     taskDetails.setManagerDetails(adm);
    //     emp.setTaskDetails(taskDetails);
    //     taskInfo.save(taskDetails);
    //     employee.save(emp);
    //     logger.info("Work added successfully");
    //     TaskAssignmentResponse response = new TaskAssignmentResponse(taskDetails);
    //     return ResponseEntity.ok(response);
    // }
}
