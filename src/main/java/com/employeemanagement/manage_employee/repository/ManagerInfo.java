package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.ManagerDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagerInfo extends JpaRepository<ManagerDetails, String> {
    // Find ManagerDetails by adm_id
    // Optional<ManagerDetails> findByAdminDetails_AdmId(String admId);

    ManagerDetails findByMngemail(String mng_email);
    ManagerDetails findByPassword(String password);
}
