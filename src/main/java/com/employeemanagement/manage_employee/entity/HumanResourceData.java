package com.employeemanagement.manage_employee.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="Human_Resource_Data")
public class HumanResourceData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String hr_id;
    private String hr_name;
    private String hr_email;
    private String hr_password;
    private String hr_contact;
    private String hr_address;
    private String hr_designation;
    private String hr_role;
    private Date hr_doj;    
    private int hr_age;
}
