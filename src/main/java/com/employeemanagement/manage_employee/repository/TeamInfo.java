/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.repository;

import org.springframework.data.repository.CrudRepository;

import com.employeemanagement.manage_employee.entity.TeamDetails;

/**
 *
 * @author pranavtitambe
 */
public interface TeamInfo extends CrudRepository<TeamDetails, String> {

}
