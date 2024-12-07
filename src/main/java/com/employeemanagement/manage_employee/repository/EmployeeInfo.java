package com.employeemanagement.manage_employee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;

public interface EmployeeInfo
        extends CrudRepository<EmployeeDetails, String>, PagingAndSortingRepository<EmployeeDetails, String> {
    EmployeeDetails findByEmail(String email);

    EmployeeDetails findByPassword(String password);

    @Query("SELECT e FROM EmployeeDetails e JOIN e.tasks t WHERE t.task_id = :task_id")
    List<EmployeeDetails> findByTaskId(@Param("task_id") String taskId);
}
