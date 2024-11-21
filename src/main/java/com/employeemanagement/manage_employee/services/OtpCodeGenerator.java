package com.employeemanagement.manage_employee.services;


public class OtpCodeGenerator {    

    public String generateOTP() {
        int randomPin = (int) (Math.random() * 9000) + 1000;
        String otp = String.valueOf(randomPin);
        return otp;
    }
}
