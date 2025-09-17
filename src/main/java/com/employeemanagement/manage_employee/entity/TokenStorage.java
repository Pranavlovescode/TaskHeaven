package com.employeemanagement.manage_employee.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "token_checker")
public class TokenStorage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String token_id;

    private String token;
}
