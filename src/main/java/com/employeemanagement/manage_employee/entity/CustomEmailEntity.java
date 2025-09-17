/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author pranavtitambe
 */

@Data
public class CustomEmailEntity {

    private String to;
    private String subject;
    private String body;

}
