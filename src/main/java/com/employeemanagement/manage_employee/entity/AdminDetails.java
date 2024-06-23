package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Entity
@Component
@Table(name = "admin_man")
public class AdminDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String adm_id;

    private String adm_name;
    private String adm_address;
    private String adm_email;
    private String adm_mobile_number;
    private String adm_pass;
    private int adm_age;
    private Date adm_date_of_joining;

    public Date getAdm_date_of_joining() {
        return adm_date_of_joining;
    }

    public void setAdm_date_of_joining(Date adm_date_of_joining) {
        this.adm_date_of_joining = adm_date_of_joining;
    }

    public int getAdm_age() {
        return adm_age;
    }

    public void setAdm_age(int adm_age) {
        this.adm_age = adm_age;
    }

    public String getAdm_pass() {
        return adm_pass;
    }

    public void setAdm_pass(String adm_pass) {
        this.adm_pass = adm_pass;
    }

    public String getAdm_mobile_number() {
        return adm_mobile_number;
    }

    public void setAdm_mobile_number(String adm_mobile_number) {
        this.adm_mobile_number = adm_mobile_number;
    }

    public String getAdm_email() {
        return adm_email;
    }

    public void setAdm_email(String adm_email) {
        this.adm_email = adm_email;
    }

    public String getAdm_address() {
        return adm_address;
    }

    public void setAdm_address(String adm_address) {
        this.adm_address = adm_address;
    }

    public String getAdm_name() {
        return adm_name;
    }

    public void setAdm_name(String adm_name) {
        this.adm_name = adm_name;
    }

    public String getAdm_id() {
        return adm_id;
    }

    public void setAdm_id(String adm_id) {
        this.adm_id = adm_id;
    }
}
