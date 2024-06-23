package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Optional;

@Entity
@Table(name="employee")
public class EmployeeDetails {


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="adm_id")
    private AdminDetails adminDetails;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="work_id")
    private WorkDetails workDetails;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String emp_id;
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

    public ManagerDetails getManagerDetails() {
        return managerDetails;
    }

    public void setManagerDetails(ManagerDetails managerDetails) {
        this.managerDetails = managerDetails;
    }

    public AdminDetails getAdminDetails() {
        return adminDetails;
    }

    public void setAdminDetails(AdminDetails adminDetails) {
        this.adminDetails = adminDetails;
    }

    public WorkDetails getWorkDetails() {
        return workDetails;
    }

    public void setWorkDetails(WorkDetails workDetails) {
        this.workDetails = workDetails;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public String getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public String getEmp_pass() {
        return emp_pass;
    }

    public void setEmp_pass(String emp_pass) {
        this.emp_pass = emp_pass;
    }

    public String getEmp_role() {
        return emp_role;
    }

    public void setEmp_role(String emp_role) {
        this.emp_role = emp_role;
    }

    public String getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(String emp_id) {
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
