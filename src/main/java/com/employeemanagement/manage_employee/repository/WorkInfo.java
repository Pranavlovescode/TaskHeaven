package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.WorkDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface WorkInfo extends CrudRepository<WorkDetails,String> {
}
