package com.employeemanagement.manage_employee.entity;

import java.util.Date;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter // Lombok annotation to create all the getters
@Setter // Lombok annotation to create all the setters
@Entity
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
    private Boolean is_verified;
    


}
