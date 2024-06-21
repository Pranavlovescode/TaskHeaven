package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name="employee")
public class EmployeeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_id_seq")
    @SequenceGenerator(name = "emp_id_seq", sequenceName = "emp_id_seq", allocationSize = 1)
    private Long emp_id;
    private String emp_name;
    private String address;
    private String email;
    private String mobile_number;
    private String emp_pass;
    private String emp_role;
    private int age;
    private Date date_of_joining;

    public String getName() {
        return emp_name;
    }

    public Long getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(Long emp_id) {
        this.emp_id = emp_id;
    }

    public void setName(String name) {
        this.emp_name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return mobile_number;
    }

    public void setPhone(String phone) {
        this.mobile_number = phone;
    }

    public String getPassword() {
        return emp_pass;
    }

    public void setPassword(String password) {
        this.emp_pass = password;
    }

    public String getRole() {
        return emp_role;
    }

    public void setRole(String role) {
        this.emp_role = role;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getDate_of_joining() {
        return date_of_joining;
    }

    public void setDate_of_joining(Date date_of_joining) {
        this.date_of_joining = date_of_joining;
    }

   

}
