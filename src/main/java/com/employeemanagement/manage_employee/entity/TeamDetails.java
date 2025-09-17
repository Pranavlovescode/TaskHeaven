/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author pranavtitambe
 */
@Data
@Entity
@Table(name="team_info")
public class TeamDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String team_id;
    private String team_name;
    private String team_desc;

    @ElementCollection
    @CollectionTable(name = "team_members", joinColumns = @jakarta.persistence.JoinColumn(name = "team_id"))
    @Column(name = "member")
    private List<String> team_members;

    // one team will have multiple tasks
    @ManyToMany
    @JoinTable(
        name = "team_tasks",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private List<TaskDetails> tasks; // Adjusted to match TaskDetails entity

    // @ElementCollection
    // @CollectionTable(name = "team_task", joinColumns = @jakarta.persistence.JoinColumn(name = "team_id"))
    // @Column(name = "task_id")
    // private List<String> task;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;
    

}
