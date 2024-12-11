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
    public void sendEmail(String to, String from,String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            message.setFrom(from); // use the domain name provided by mailtrap website.
            emailSender.send(message);
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
    }

    @Override
    public void sendEmailWithHtml(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("testheaven@pranavtitambe.in");
        emailSender.send(message);
    }

    @Override
    public void sendEmailWithAttachment() {

    }
}
