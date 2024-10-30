package com.employeemanagement.manage_employee;

import com.employeemanagement.manage_employee.services.EmailSerivce;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ManageEmployeeApplicationTests {

	@Test
	void contextLoads() {
	}
	@Autowired
	private EmailSerivce emailSerivce;
	@Test
	void sendEmailTest(){
		emailSerivce.sendEmail(
				"pranavtitambe04@gmail.com",
				"This is the email for testing",
				"This is the test email which is send by Pranav to test system performance"
		);
	}
}
