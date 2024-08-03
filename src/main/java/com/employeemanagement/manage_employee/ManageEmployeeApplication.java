package com.employeemanagement.manage_employee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.logging.Logger;

@SpringBootApplication
public class ManageEmployeeApplication {

	public static void main(String[] args) {

		SpringApplication.run(ManageEmployeeApplication.class, args);
		Logger logger = Logger.getLogger(ManageEmployeeApplication.class.getName());
		logger.info("Application started successfully");
	}

}
