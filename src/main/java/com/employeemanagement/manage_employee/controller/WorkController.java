package com.employeemanagement.manage_employee.controller;


import com.employeemanagement.manage_employee.entity.WorkDetails;
import com.employeemanagement.manage_employee.repository.WorkInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.Date;

@RestController
@RequestMapping("/add-work")
public class WorkController {

    @Autowired
    private WorkInfo workInfo;

    @PostMapping
    public String addWork(@RequestBody WorkDetails workDetails){

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        if (workDetails.getAlloted_time() == null) {
            workDetails.setAlloted_time(timestamp);
        }

        workDetails.setCompletion_time(timestamp);
        workInfo.save(workDetails);
        return "Work added successfully";
    }

}
