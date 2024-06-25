package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "login_time_details")
public class LoginTimeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String time_id;
    private Timestamp login_time;
    private Timestamp logout_time;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="emp_id")
    private EmployeeDetails employeeDetails;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="adm_id")
    private AdminDetails adminDetails;

    public String getTime_id() {
        return time_id;
    }

    public void setTime_id(String time_id) {
        this.time_id = time_id;
    }

    public Timestamp getLogin_time() {
        return login_time;
    }

    public void setLogin_time(Timestamp login_time) {
        this.login_time = login_time;
    }

    public Timestamp getLogout_time() {
        return logout_time;
    }

    public void setLogout_time(Timestamp logout_time) {
        this.logout_time = logout_time;
    }

    public EmployeeDetails getEmployeeDetails() {
        return employeeDetails;
    }

    public void setEmployeeDetails(EmployeeDetails employeeDetails) {
        this.employeeDetails = employeeDetails;
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
}
