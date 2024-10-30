package com.employeemanagement.manage_employee.services;

public interface EmailSerivce {
    void sendEmail(String to, String subject, String body);
    void sendEmailWithHtml();
    void sendEmailWithAttachment();
}
