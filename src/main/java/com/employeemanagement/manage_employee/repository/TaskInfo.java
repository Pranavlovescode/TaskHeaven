package com.employeemanagement.manage_employee.repository;

import org.springframework.data.repository.CrudRepository;

import com.employeemanagement.manage_employee.entity.TaskDetails;

public interface TaskInfo extends CrudRepository<TaskDetails,String> {
}
