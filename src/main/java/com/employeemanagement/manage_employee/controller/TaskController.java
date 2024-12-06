package com.employeemanagement.manage_employee.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.entity.TaskDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.TaskInfo;
import com.employeemanagement.manage_employee.response.TaskAssignmentResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/add-task")
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

    // Adding task to the database along with reference to manager
    @PostMapping()
    public ResponseEntity<?> addWork(@RequestBody TaskDetails taskDetails, @RequestParam String mng_id) {
        try {
            Date date = new Date();
            taskDetails.setAlloted_time(new Timestamp(date.getTime()));
            ManagerDetails mng = manager.findById(mng_id).get();
            taskDetails.setManagerDetails(mng);
            taskInfo.save(taskDetails);
            logger.log(Level.INFO, "Task added successfully->{0}", taskDetails);
            TaskAssignmentResponse response = new TaskAssignmentResponse(taskDetails);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // TODO: handle exception
            logger.log(Level.WARNING, "Error occured while adding task to the database->{0}", e);
            return ResponseEntity.status(500).body("Error occured while adding task to the database" + e);
        }
    }

    // Get all tasks
    @GetMapping()
    public ResponseEntity<?> getAllTasks() {
        return ResponseEntity.status(200).body(taskInfo.findAll());
    }

    // Update task status
    @PutMapping("/update")
    public ResponseEntity<?> updateTaskStatus(@RequestParam String task_id, @RequestParam String status) {
        try {
            TaskDetails task = taskInfo.findById(task_id).get();
            if (task != null) {
                task.setStatus(status);
                taskInfo.save(task);
                logger.log(Level.INFO, "Task status updated successfully");
                return ResponseEntity.status(200).body("Task status updated successfully"+task);
            } else {
                logger.log(Level.WARNING, "Task not found");
                return ResponseEntity.status(404).body("Task not found");
            }
        } catch (Exception e) {
            logger.log(Level.WARNING, "Error occured while updating task status->{0}", e);
            return ResponseEntity.status(500).body("Error occured while updating task status" + e);
        }
    }
}
