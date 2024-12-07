/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.TeamDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.TaskInfo;
import com.employeemanagement.manage_employee.repository.TeamInfo;



/**
 *
 * @author pranavtitambe
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/team")
public class TeamController {
    private static final Logger logger = Logger.getLogger(HumanResourceDataController.class.getName());

    @Autowired
    private TeamInfo teamInfo;
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private TaskInfo taskInfo;

    @PostMapping("/create")
    public ResponseEntity<?> createTeam(@RequestBody TeamDetails teamDetails,@RequestParam String mng_id) {
        //TODO: process POST request
        if(teamDetails !=null){
            teamDetails.setManagerDetails(managerInfo.findById(mng_id).get());
            // teamDetails.setTask((java.util.List<String>) taskInfo.findById(task_id).get());
            teamInfo.save(teamDetails);
            logger.log(Level.INFO, "Team created successfuly -> {0}", teamDetails);
            return ResponseEntity.status(200).body("Team Created");
        }
        logger.log(Level.WARNING, "Error in creating team");
        return ResponseEntity.status(404).body("Error in creating team");
    }

    @GetMapping
    public ResponseEntity<?> getTeams() {
        return ResponseEntity.status(200).body(teamInfo.findAll());
    }
    
    

}