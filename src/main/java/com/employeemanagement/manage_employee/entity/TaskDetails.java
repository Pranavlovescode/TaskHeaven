package com.employeemanagement.manage_employee.entity;


import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="task_info")
public class TaskDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String task_id;
    private String task_name;
    private String task_description;
    private Timestamp alloted_time;
    private Timestamp completion_time;
    private String status;
    private Timestamp due_date;



    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;   

   
}
