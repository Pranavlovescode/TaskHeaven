package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeInfo extends CrudRepository<EmployeeDetails, String>{

}
