package com.employeemanagement.manage_employee.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.employeemanagement.manage_employee.Interface.EmailSerivceInterface;

@Service
public class EmailService implements EmailSerivceInterface {
    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("2004.sapp@gmail.com"); // use the domain name provided by mailtrap website.
        emailSender.send(message);
    }

    @Override
    public void sendEmailWithHtml(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("2004.sapp@gmail.com");
        emailSender.send(message);
    }

    @Override
    public void sendEmailWithAttachment() {

    }
}
