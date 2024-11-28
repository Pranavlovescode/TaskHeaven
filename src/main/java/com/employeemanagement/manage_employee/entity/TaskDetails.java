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



    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;    

    public Timestamp getAlloted_time() {
        return alloted_time;
    }

    public void setAlloted_time(Timestamp alloted_time) {
        this.alloted_time = alloted_time;
    }

    public Timestamp getCompletion_time() {
        return completion_time;
    }

    public void setCompletion_time(Timestamp completion_time) {
        this.completion_time = completion_time;
    }

    public ManagerDetails getManagerDetails() {
        return managerDetails;
    }

    public void setManagerDetails(ManagerDetails managerDetails) {
        this.managerDetails = managerDetails;
    }
}
