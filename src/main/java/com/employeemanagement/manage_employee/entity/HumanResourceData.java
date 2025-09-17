package com.employeemanagement.manage_employee.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name="Human_Resource_Data")
public class HumanResourceData {
    @Id 
    @Column(name = "hr_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String hrId;
    private String hr_name;
    
    @Column(name = "hr_email")
    private String hremail;
    private String hr_password;
    private String hr_contact;
    private String hr_address;
    private String hr_designation;
    private String hr_role;
    private Date hr_doj;    
    private int hr_age;
    private String admin_verified;

}
