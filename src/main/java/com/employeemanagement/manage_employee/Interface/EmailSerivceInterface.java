package com.employeemanagement.manage_employee.Interface;

public interface EmailSerivceInterface {
    void sendEmail(String to, String from, String subject, String body);
    void sendEmailWithHtml(String to, String subject, String body);
    void sendEmailWithAttachment();
}
