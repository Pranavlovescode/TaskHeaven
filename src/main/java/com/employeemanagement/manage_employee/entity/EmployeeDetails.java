package com.employeemanagement.manage_employee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.Optional;



@Getter
@Setter
@Entity
@Table(name="employee")
public class EmployeeDetails {


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="mng_id")
    private ManagerDetails managerDetails;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="adm_id")
    private AdminDetails adminDetails;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="work_id")
    private WorkDetails workDetails;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String emp_id;
    private String name;
    private String address;
    private String email;
    private String mobile_number;
    private String password;
    private String role;
    private int age;
    private Date date_of_joining;

}
