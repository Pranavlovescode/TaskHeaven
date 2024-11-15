package com.employeemanagement.manage_employee.services;
import org.springframework.stereotype.Service;

import com.employeemanagement.manage_employee.Interface.OtpCodeGeneratorInterface;

@Service
public class OtpCodeGenerator implements OtpCodeGeneratorInterface {    
    @Override
    public String generateOTP() {
        int randomPin = (int) (Math.random() * 9000) + 1000;
        String otp = String.valueOf(randomPin);
        return otp;
    }
}
