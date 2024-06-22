package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="manager")
public class ManagerDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mng_id_seq")
    @SequenceGenerator(name = "mng_id_seq", sequenceName = "mng_id_seq", allocationSize = 1)
    private Long mng_id;

    @ManyToOne
    @JoinColumn(name = "adm_id",insertable = true, updatable = true, nullable = true, unique = true, referencedColumnName = "adm_id")
    private AdminDetails adminDetails;


    private String mng_name;
    private int mng_age;
    private String mng_address;
    private String mng_email;
    private String mng_mobile_number;
    private String mng_pass;
    private Date mng_date_of_joining;

    public Date getMng_date_of_joining() {
        return mng_date_of_joining;
    }

    public AdminDetails getAdminDetails() {
        return adminDetails;
    }

    public void setAdminDetails(AdminDetails adminDetails) {
        this.adminDetails = adminDetails;
    }

    public void setMng_date_of_joining(Date mng_date_of_joining) {
        this.mng_date_of_joining = mng_date_of_joining;
    }

    public int getMng_age() {
        return mng_age;
    }

    public void setMng_age(int mng_age) {
        this.mng_age = mng_age;
    }

    public String getMng_name() {
        return mng_name;
    }

    public void setMng_name(String mng_name) {
        this.mng_name = mng_name;
    }

    public Long getMng_id() {
        return mng_id;
    }

    public void setMng_id(Long mng_id) {
        this.mng_id = mng_id;
    }

    public String getMng_address() {
        return mng_address;
    }

    public void setMng_address(String mng_address) {
        this.mng_address = mng_address;
    }

    public String getMng_email() {
        return mng_email;
    }

    public void setMng_email(String mng_email) {
        this.mng_email = mng_email;
    }

    public String getMng_mobile_number() {
        return mng_mobile_number;
    }

    public void setMng_mobile_number(String mng_mobile_number) {
        this.mng_mobile_number = mng_mobile_number;
    }

    public String getMng_pass() {
        return mng_pass;
    }

    public void setMng_pass(String mng_pass) {
        this.mng_pass = mng_pass;
    }
}
