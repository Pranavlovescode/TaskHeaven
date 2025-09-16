package com.employeemanagement.manage_employee.entity;

import java.util.Date;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Component
@Table(name = "admin_man")
public class AdminDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String adm_id;

    private String name;
    private String address;
    private String admemail;
    private String mobile_number;
    private String password;
    private int age;
    private Date date_of_joining;
    private String is_verified;
    


}
