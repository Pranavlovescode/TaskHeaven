/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import java.util.ArrayList;
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

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.TeamDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.TeamInfo;
import com.employeemanagement.manage_employee.response.TaskRetrieveResponse;



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
    // @Autowired
    // private TaskInfo taskInfo;

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

    @GetMapping("/employee")
    public ResponseEntity<?> getTeamByEmployee(@RequestParam String email) {        
        TeamDetails team = teamInfo.findByteam_memberEmail(email);
        logger.log(Level.INFO, "Team of employee -> {0}", team);
        return ResponseEntity.status(200).body(team);
    }

    // This route will return all the tasks assigned to the team
    @GetMapping("/tasks")
    public ResponseEntity<?> getTeamTasks(@RequestParam String team_id) {
        TeamDetails team = teamInfo.findById(team_id).get();
        // HashMap<String,TaskRetrieveResponse> response = new HashMap<>();
        ArrayList<TaskRetrieveResponse> taskArray = new ArrayList<>();
        team.getTasks().forEach(task -> {

            EmployeeDetails employee = employeeInfo.findByTaskId(task.getTask_id());

            TaskRetrieveResponse taskResponse = new TaskRetrieveResponse(
                task.getTask_id(),
                task.getTask_name(),
                task.getTask_description(),
                task.getStatus(),
                employee.getEmail(),
                employee.getName(),
                employee.getEmp_id(),
                task.getAlloted_time(),
                task.getCompletion_time()
            );

            taskArray.add(taskResponse);
            
        });

        // ArrayList<?> taskResponse = new ArrayList<>();
        // taskResponse.addAll(response);
        
        
        logger.log(Level.INFO, "Tasks of team -> {0}", taskArray);
        return ResponseEntity.status(200).body(taskArray);
    }   
    

}
