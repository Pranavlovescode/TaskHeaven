package com.employeemanagement.manage_employee.repository;

import com.employeemanagement.manage_employee.entity.TokenStorage;
import org.springframework.data.repository.CrudRepository;

public interface TokenStorageInfo extends CrudRepository<TokenStorage, String> {
    TokenStorage findByToken(String token);
}
