/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.employeemanagement.manage_employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employeemanagement.manage_employee.entity.PayrollDetails;

/**
 *
 * @author pranavtitambe
 */
public interface PayrollInfo extends JpaRepository<PayrollDetails,String>{
    
}
