package com.employeemanagement.manage_employee.entity;

import java.util.Date;

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
    private Boolean is_verified;
    private String mng_designation;
    private String role;

}
