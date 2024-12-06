package com.employeemanagement.manage_employee.repository;

import org.springframework.data.repository.CrudRepository;

import com.employeemanagement.manage_employee.entity.HumanResourceData;


public interface HumanResourceInfo extends CrudRepository<HumanResourceData, String> {
    HumanResourceData findByHrId(String hr_id);    
    HumanResourceData findByHremail(String hr_email);
}
