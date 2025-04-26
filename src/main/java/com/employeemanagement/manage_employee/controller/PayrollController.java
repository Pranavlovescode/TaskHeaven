/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.PayrollDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.PayrollInfo;



/**
 *
 * @author pranavtitambe
 */

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/payroll")
public class PayrollController {

    @Autowired
    private PayrollInfo payrollInfo;
    @Autowired
    private EmployeeInfo employeeInfo;

    @GetMapping("")
    public ResponseEntity<?> getAllPayroll() {
        return ResponseEntity.status(200).body(payrollInfo.findAll());
    }

    @GetMapping("/by-id")
    public ResponseEntity<?> getPayrollById(@RequestParam String id){
        try {
            if (id != null) {
                return ResponseEntity.status(200).body(payrollInfo.findById(id));                
            }
            else{
                return ResponseEntity.status(400).body("Id is null");
            }
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body("No Entry found for this id");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> addANewPayroll(@RequestBody PayrollDetails payrollDetails,@RequestParam String emp_id){
        //TODO: process POST request
        try {
            if (payrollDetails != null) {
                EmployeeDetails emp = employeeInfo.findById(emp_id).get();
                Double basic_payFloat = payrollDetails.getCtc()*0.4;
                Double home_rental_allowanceFloat = basic_payFloat * 0.5;
                Double bonusFloat = basic_payFloat * (8.33/100);
                Double other_allowanceFloat = basic_payFloat * 0.2;
                Double provident_fundFloat = basic_payFloat * 0.12;
                Double deductionFloat = provident_fundFloat;
                Double gross_salary_before_deductionFloat = basic_payFloat + home_rental_allowanceFloat + bonusFloat + other_allowanceFloat;
                Double net_salary_after_deductionFloat = gross_salary_before_deductionFloat - deductionFloat;
                
                payrollDetails.setBasic_pay(basic_payFloat);
                payrollDetails.setHome_rental_allowance(home_rental_allowanceFloat);
                payrollDetails.setBonus(bonusFloat);
                payrollDetails.setOther_allowance(other_allowanceFloat);
                payrollDetails.setProvident_fund(provident_fundFloat);
                payrollDetails.setDeduction(deductionFloat);
                payrollDetails.setGross_salary_before_deduction(gross_salary_before_deductionFloat);
                payrollDetails.setNet_salary_after_deduction(net_salary_after_deductionFloat);                
                payrollDetails.setEmployeeDetails(emp);
                payrollDetails.setStatus("Pending");
                payrollInfo.save(payrollDetails);
                return ResponseEntity.status(200).body("Payroll created successfully");
            }
            else{
                return ResponseEntity.status(400).body("Payroll is null");
            }
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(500).body("Payroll not created");
        }                
    }   

    @PostMapping("/update")
    public ResponseEntity<?> updatePayroll(@RequestParam String payroll_id, @RequestBody PayrollDetails payrollDetails){
        try {
            if (payroll_id != null) {
                PayrollDetails payroll = payrollInfo.findById(payroll_id).get();
                payroll.setBasic_pay(payrollDetails.getBasic_pay());
                payroll.setHome_rental_allowance(payrollDetails.getHome_rental_allowance());
                payroll.setBonus(payrollDetails.getBonus());
                payroll.setOther_allowance(payrollDetails.getOther_allowance());
                payroll.setProvident_fund(payrollDetails.getProvident_fund());
                payroll.setDeduction(payrollDetails.getDeduction());
                payroll.setGross_salary_before_deduction(payrollDetails.getGross_salary_before_deduction());
                payroll.setNet_salary_after_deduction(payrollDetails.getNet_salary_after_deduction());
                payroll.setDate_of_salary(payrollDetails.getDate_of_salary());
                payroll.setStatus(payrollDetails.getStatus());
                payrollInfo.save(payroll);
                return ResponseEntity.status(200).body("Payroll updated successfully");
            }
            else{
                return ResponseEntity.status(400).body("Payroll id is null");
            }
        } catch (Exception e) {
            return ResponseEntity.status(200).body("Failed to update payroll");
        } 
    }   

}
