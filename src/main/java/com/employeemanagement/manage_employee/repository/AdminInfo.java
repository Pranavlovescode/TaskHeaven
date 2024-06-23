package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface AdminInfo extends CrudRepository<AdminDetails, String> {
}
