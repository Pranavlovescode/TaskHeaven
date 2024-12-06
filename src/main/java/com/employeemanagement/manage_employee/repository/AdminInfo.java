package com.employeemanagement.manage_employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employeemanagement.manage_employee.entity.AdminDetails;

public interface AdminInfo extends JpaRepository<AdminDetails, String> {
    AdminDetails findByAdmemail(String adm_email);
    AdminDetails findByPassword(String password);
}
