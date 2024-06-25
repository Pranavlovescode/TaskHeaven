package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import lombok.extern.flogger.Flogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/add-manager")
public class ManagerController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private EmployeeInfo employeeInfo;

    @PostMapping
    public String addManager(@RequestBody ManagerDetails managerDetails) {
        Date date = new Date();
        managerDetails.setMng_date_of_joining(date);
//        List<EmployeeDetails> emp_list = new ArrayList<>();
//        managerDetails.setEmployeeDetails(emp_list);
        managerInfo.save(managerDetails);
        return "Manager added successfully";
    }

    @GetMapping("/{id}")
    public String getEmployeeUnderManager(@PathVariable("id") String id) {
        Optional<EmployeeDetails> emp = employeeInfo.findById(id);
        if (emp.isPresent()) {
            return "Employee under manager: " + emp.get().getEmp_name();
        }
        return "No employee under this manager";

    }

    @PutMapping("/{mng_id}/{emp1_id}/{emp2_id}/{emp3_id}/{emp4_id}/{emp5_id}")
    public String addEmployeeToManager(@PathVariable("mng_id") String mng_id, @PathVariable("emp1_id") String emp1_id, @PathVariable("emp2_id") String emp2_id, @PathVariable("emp3_id") String emp3_id, @PathVariable("emp4_id") String emp4_id, @PathVariable("emp5_id") String emp5_id) {
        ManagerDetails mng = managerInfo.findById(mng_id).get();
        EmployeeDetails emp1 = employeeInfo.findById(emp1_id).get();
        EmployeeDetails emp2 = employeeInfo.findById(emp2_id).get();
        EmployeeDetails emp3 = employeeInfo.findById(emp3_id).get();
        EmployeeDetails emp4 = employeeInfo.findById(emp4_id).get();
        EmployeeDetails emp5 = employeeInfo.findById(emp5_id).get();
        List<EmployeeDetails> emp_list = new ArrayList<>();
        emp_list.add(emp1);
        emp_list.add(emp2);
        emp_list.add(emp3);
        emp_list.add(emp4);
        emp_list.add(emp5);
        for (int i = 0; i <= emp_list.indexOf(emp5); i++) {
            emp_list.get(i).setManagerDetails(mng);
            employeeInfo.save(emp_list.get(i));
        }
//        emp_list.add(emp5);
//        mng.setEmployeeDetails(emp_list);
//        managerInfo.save(mng);
//    emp1.setManagerDetails(mng);
        logger.info("Employees added to manager");
        return "Employees added to manager";
    }

//    @GetMapping
//    public String getAllEmployeeUnderManager(){
//        ManagerDetails mng_id = managerInfo.findById("55d81210-0259-4d55-a955-6bf78666eccc").get();
//
//
//        return "No employee under this manager";
//    }
}
