package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface EmployeeInfo extends CrudRepository<EmployeeDetails, String>, PagingAndSortingRepository<EmployeeDetails,String> {
    EmployeeDetails findByEmail(String email);
    EmployeeDetails findByPassword(String password);
}
