/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.response;


import java.sql.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author pranav
 */
@Getter
@Setter
public class TaskRetrieveResponse {

    private String taskId;
    private String taskName;
    private String taskDescription;
    private String status;
    private String employeeEmail;
    private String employeeName;
    private String EmployeeId;
    private Timestamp allotedTime;
    private Timestamp completionTime;

    public TaskRetrieveResponse(String taskId, String taskName, String taskDescription, String status,String employeeEmail,String employeeName,String EmployeeId,Timestamp allotedTime,Timestamp completionTime) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = status;
        this.employeeEmail = employeeEmail;
        this.employeeName = employeeName;
        this.EmployeeId = EmployeeId;
        this.allotedTime = allotedTime;
        this.completionTime = completionTime;
    }

}
