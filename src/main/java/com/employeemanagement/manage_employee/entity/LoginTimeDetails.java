package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;



@Data
@Entity
@Table(name = "login_time_details")
public class LoginTimeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String time_id;
//    @Column(nullable=false)
//    private  String email;
    @Column(nullable = false)
    private String password;
    private String role;
    private Timestamp login_time;
    private Timestamp logout_time;

    private  String email;
}
