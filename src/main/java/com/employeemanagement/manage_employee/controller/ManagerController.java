package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/add-manager")
public class ManagerController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private ManagerInfo managerInfo;
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private AdminInfo adminInfo;

    //    Adding a new manager to the database
    @PostMapping("/register")
    public String addManager(@RequestBody ManagerDetails managerDetails) {
        Date date = new Date();
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String mng_password = bcrypt.encode(managerDetails.getPassword());
        managerDetails.setPassword(mng_password);
        managerDetails.setDate_of_joining(date);
        managerInfo.save(managerDetails);
        return "Manager added successfully";
    }

    //    Checking if employee exists under a manager or not
    @GetMapping("/{id}")
    public String getEmployeeUnderManager(@PathVariable("id") String id) {
        Optional<EmployeeDetails> emp = employeeInfo.findById(id);
        if (emp.isPresent()) {
            return "Employee under manager: " + emp.get().getName();
        }
        return "No employee under this manager";

    }
    @GetMapping()
    public ResponseEntity<?> geAlltManager() {
        Iterable<ManagerDetails> mng = managerInfo.findAll();
        return new ResponseEntity<>(mng, HttpStatus.OK);
    }


    //    Adding employees to a manager using list of employee ids
    @GetMapping("/{mng_id}/{emp1_id}/{emp2_id}/{emp3_id}/{emp4_id}/{emp5_id}")
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

        logger.info("Employees added to manager");
        return "Employees added to manager";
    }


    @GetMapping("/{mng_id}/{emp_id}")
    public ResponseEntity<?> addSingleManagerToEmployee( @PathVariable("mng_id") String mng_id,@PathVariable("emp_id") String emp_id) {
        ManagerDetails mng = managerInfo.findById(mng_id).get();
        EmployeeDetails employee = employeeInfo.findById(emp_id).get();
        employee.setManagerDetails(mng);
        employeeInfo.save(employee);
        return new ResponseEntity<>(employee,HttpStatus.OK);

    }

}
