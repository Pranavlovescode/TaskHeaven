/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.employeemanagement.manage_employee.entity.TeamDetails;

/**
 *
 * @author pranavtitambe
 */
public interface TeamInfo extends CrudRepository<TeamDetails, String> {

    @Query("SELECT t FROM TeamDetails t JOIN t.team_members members WHERE :email = members")
    TeamDetails findByteam_memberEmail(@Param("email") String email);

}
