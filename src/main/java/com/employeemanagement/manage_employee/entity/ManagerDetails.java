package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "manager")
public class ManagerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String mng_id;

    @ManyToOne
    @JoinColumn(name = "adm_id", insertable = true, updatable = true, nullable = true, unique = true, referencedColumnName = "adm_id")
    private AdminDetails adminDetails;


    private String name;
    private int age;
    private String address;
    private String mngemail;
    private String mobile_number;
    private String password;
    private Date date_of_joining;

}
