package com.employeemanagement.manage_employee.controller;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.WorkInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.logging.Logger;


@RestController
@RequestMapping("/add-employee")
public class EmployeeController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo manager;
    @Autowired
    private AdminInfo admin;
    @Autowired
    private WorkInfo work;

    @PostMapping
    public EmployeeDetails addEmployee(@RequestBody EmployeeDetails employeeDetails) {
        Date date = new Date();
        employeeDetails.setDate_of_joining(date);
//        employeeDetails.setManagerDetails(manager.findById("063cc2ce-5e38-4019-8775-0e72addb3983").get());
//        employeeDetails.setAdminDetails(admin.findById("646d187f-3b6c-4274-94d7-27154d3bba9c").get());
        employeeInfo.save(employeeDetails);
        return employeeDetails;

    }

    @GetMapping
    public Iterable<EmployeeDetails> getEmployee() {
        return employeeInfo.findAll();
    }

    @GetMapping("/{id}")
    public ManagerDetails getEmployeeById(@PathVariable("id") String id) {

        EmployeeDetails emp = employeeInfo.findById(id).get();
        logger.info("Manager Details fetched Successfully");
        return  emp.getManagerDetails();

    }

    @PutMapping("/{mng_id}/{emp_id}")
    public EmployeeDetails addManagerToEmployee( @PathVariable("mng_id") String mngid,@PathVariable("emp_id") String empid) {
        ManagerDetails mng = manager.findById(mngid).get();
        EmployeeDetails employee = employeeInfo.findById(empid).get();
        employee.setManagerDetails(mng);
        employeeInfo.save(employee);
        return employee;
    }



    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable("id") String id) {
        employeeInfo.deleteById(id);

        logger.info("Employee Deleted Successfully");
        return "Employee deleted";
    }

}
