package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.ManagerDetails;

import org.springframework.data.repository.CrudRepository;


public interface ManagerInfo extends CrudRepository<ManagerDetails, String> {
    ManagerDetails findByMngemail(String mng_email);
    ManagerDetails findByPassword(String password);
}
