package com.employeemanagement.manage_employee.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "token_checker")
@Getter
@Setter
public class TokenStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String token_id;

    private String token;
}
