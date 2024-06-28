package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;



@Getter
@Setter
@Entity
@Table(name = "login_time_details")
public class LoginTimeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String time_id;
    @Column(unique = true,nullable=false)
    private  String email;
    @Column(nullable = false)
    private String password;
    private String role;
    private Timestamp login_time;
    private Timestamp logout_time;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="emp_id")
    private EmployeeDetails employeeDetails;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="adm_id")
    private AdminDetails adminDetails;


}
