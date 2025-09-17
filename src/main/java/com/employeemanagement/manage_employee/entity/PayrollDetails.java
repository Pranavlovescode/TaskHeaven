/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author pranavtitambe
 */
@Data
@Entity(name="payroll_info")
public class PayrollDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String payroll_id;

    private Double ctc;
    private Double basic_pay;
    private Double home_rental_allowance;
    private Double bonus;
    private Double other_allowance;
    private Double provident_fund;
    private Double deduction;
    private Double gross_salary_before_deduction;
    private Double net_salary_after_deduction;
    private Date date_of_salary;
    private String status;

    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name="emp_id")
    private EmployeeDetails employeeDetails;


}
