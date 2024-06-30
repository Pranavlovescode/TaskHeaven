package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.LoginTimeDetails;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LoginTimeInfo extends CrudRepository<LoginTimeDetails,String> {
    LoginTimeDetails findByEmail(String email);
}
