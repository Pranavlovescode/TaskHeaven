package com.employeemanagement.manage_employee.repository;

import org.springframework.data.repository.CrudRepository;

import com.employeemanagement.manage_employee.entity.LoginTimeDetails;

public interface LoginTimeInfo extends CrudRepository<LoginTimeDetails,String> {
    LoginTimeDetails findByEmail(String email);
}
