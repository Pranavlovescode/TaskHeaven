package com.employeemanagement.manage_employee.response;

import com.employeemanagement.manage_employee.entity.TaskDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskAssignmentResponse {
    
    private TaskDetails taskDetails;
    
        public TaskAssignmentResponse(TaskDetails taskDetails2){
            this.taskDetails = taskDetails2;
    }
}
