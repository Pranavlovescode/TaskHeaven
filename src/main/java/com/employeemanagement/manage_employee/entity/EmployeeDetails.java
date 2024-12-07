package com.employeemanagement.manage_employee.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="employee")
public class EmployeeDetails  {


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="adm_id")
    private AdminDetails adminDetails;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="task_id")
    private TaskDetails taskDetails;

    // One employee can have multiple tasks
    @ManyToMany
    @JoinTable(
        name = "employee_tasks",
        joinColumns = @JoinColumn(name = "emp_id"),
        inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private List<TaskDetails> tasks; // Adjusted to match TaskDetails entity

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String emp_id;
    private String name;
    private String address;
    private String email;
    private String mobile_number;
    private String password;
    private String emp_dessignation;
    private String role;
    private int age;
    private Date date_of_joining;
    private String is_verified;


    
}
