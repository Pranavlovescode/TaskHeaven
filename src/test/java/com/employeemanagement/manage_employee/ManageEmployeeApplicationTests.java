package com.employeemanagement.manage_employee;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.employeemanagement.manage_employee.Interface.EmailSerivceInterface;


@SpringBootTest
class ManageEmployeeApplicationTests {
	private static final Logger logger = LoggerFactory.getLogger(ManageEmployeeApplicationTests.class);

	@Test
	void contextLoads() {
	}
	@Autowired
	private EmailSerivceInterface emailSerivce;
	@Test
	void sendEmailTest(){
		emailSerivce.sendEmail(
				"pranavtitambe04@gmail.com",
				"This is the email for testing",
				"This is the test email which is send by Pranav to test system performance"
		);
	}

	
}
