package com.employeemanagement.manage_employee.controller;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.ManageEmployeeApplication;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.entity.TaskDetails;
import com.employeemanagement.manage_employee.entity.TeamDetails;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.repository.TaskInfo;
import com.employeemanagement.manage_employee.repository.TeamInfo;
import com.employeemanagement.manage_employee.response.EmployeeRegisterResponse;
import com.employeemanagement.manage_employee.services.EmailService;
import com.employeemanagement.manage_employee.services.OtpCodeGenerator;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/add-employee")
public class EmployeeController {
    Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
    @Autowired
    private EmployeeInfo employeeInfo;
    @Autowired
    private ManagerInfo manager;
    // @Autowired
    // private AdminInfo admin;
    // @Autowired
    // private WorkInfo work;

    @Autowired
    private EmailService javaMailService;

    @Autowired
    private TaskInfo taskInfo;
    @Autowired
    private TeamInfo teamInfo;

    // Adding a new employee to the database
    @PostMapping("/register")
    public ResponseEntity<?> addEmployee(@RequestBody EmployeeDetails employeeDetails) {
        // Date date = new Date();
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String emp_password = bcrypt.encode(employeeDetails.getPassword());
        employeeDetails.setPassword(emp_password);
        // employeeDetails.setDate_of_joining(date);
        employeeInfo.save(employeeDetails);
        OtpCodeGenerator otpGenerator = new OtpCodeGenerator();
        String otp = otpGenerator.generateOTP();
        try {
            int decider = 0;
            javaMailService.sendEmail(employeeDetails.getEmail(),"admin@taskheaven.pranavtitambe.in", "Verification Complete",
                    "You have been successfully verified as an employee. Now click on link to verify your email. http://localhost:3000/register/verify-email. Your OTP for verification is "
                            + otp);
            decider = 1;

            if (decider == 1) {
                logger.info("Email sent successfully");
            } else {
                logger.info("Email not sent");
            }
        } catch (Exception e) {
            logger.log(Level.INFO, "Failed to send email: {0}", e);
        }
        EmployeeRegisterResponse response = new EmployeeRegisterResponse(employeeDetails,
                "Employee added successfully and verification email sent");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    // Fetching all the employees from the database
    @GetMapping
    public Page<EmployeeDetails> getEmployee_Paginated(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return employeeInfo.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEmployeeWithoutPagination() {
        return ResponseEntity.status(200).body(employeeInfo.findAll());
    }

    // Fetching a manager details using employee id (checking if manager exists for
    // a given employee id)
    @GetMapping("/{id}")
    public EmployeeDetails getEmployeeById(@PathVariable("id") String id) {

        EmployeeDetails emp = employeeInfo.findById(id).get();
        logger.info("Employee Details fetched Successfully");
        return emp;

    }

    // Adding a manager to an employee using manager id and employee id
    @PutMapping("/{mng_id}/{emp_id}")
    public EmployeeDetails addManagerToEmployee(@PathVariable("mng_id") String mngid,
            @PathVariable("emp_id") String empid) {
        ManagerDetails mng = manager.findById(mngid).get();
        EmployeeDetails employee = employeeInfo.findById(empid).get();
        employee.setManagerDetails(mng);
        employeeInfo.save(employee);
        return employee;
    }

    // Deleting an employee using employee id
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable("id") String id) {
        employeeInfo.deleteById(id);

        logger.info("Employee Deleted Successfully");
        return "Employee deleted";
    }

    @PostMapping("/assign-task")
    public ResponseEntity<?> assignTaskToEmployee(@RequestBody List<String> task_id, @RequestParam String email,@RequestParam String team_id) {
        //TODO: process POST request
        try {
            if (task_id.isEmpty() || team_id.isEmpty()) {
                return ResponseEntity.status(400).body("Task id cannot be empty");
            }else{
                EmployeeDetails emp = employeeInfo.findByEmail(email);
                TeamDetails team = teamInfo.findById(team_id).get();
                List<TaskDetails> tasks = (List<TaskDetails>) taskInfo.findAllById(task_id);
                emp.getTasks().addAll(tasks);
                team.getTasks().addAll(tasks);
                employeeInfo.save(emp);
                teamInfo.save(team);
                logger.log(Level.INFO, "Task assigned to Employee successfully -> {}", emp);
                return ResponseEntity.status(200).body("Task assigned to Employee successfully -> " + emp);
            }
            
        } catch (Exception e) {
            // TODO: handle exception
            logger.log(Level.INFO, "Error in assigning task -> {}", e);
            return ResponseEntity.status(500).body("Error in assigning task -> " + e);
        }
        
    }


}
