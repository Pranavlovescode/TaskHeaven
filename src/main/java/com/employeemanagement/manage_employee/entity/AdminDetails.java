package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Date;

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


}
