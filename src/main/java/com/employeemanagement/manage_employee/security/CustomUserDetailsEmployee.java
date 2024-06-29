package com.employeemanagement.manage_employee.security;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsEmployee implements UserDetailsService {


    private LoginTimeInfo loginTimeInfo;
    private EmployeeInfo employeeInfo;
    private ManagerInfo managerInfo;
    private AdminInfo adminInfo;

    @Autowired
    public CustomUserDetailsEmployee(LoginTimeInfo loginTimeInfo, EmployeeInfo employeeInfo,
                                     ManagerInfo managerInfo, AdminInfo adminInfo) {
        this.loginTimeInfo = loginTimeInfo;
        this.employeeInfo = employeeInfo;
        this.managerInfo = managerInfo;
        this.adminInfo = adminInfo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EmployeeDetails emp = employeeInfo.findByEmail(username);
        if (emp != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(emp.getEmail())
                    .password(emp.getPassword())
                    .roles("EMPLOYEE")
                    .build();
        }

        ManagerDetails mng = managerInfo.findByMngemail(username);
        if (mng != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(mng.getMngemail())
                    .password(mng.getPassword())
                    .roles("MANAGER")
                    .build();
        }

        AdminDetails adm = adminInfo.findByAdmemail(username);
        if (adm != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(adm.getAdmemail())
                    .password(adm.getPassword())
                    .roles("ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException("User not found");
    }
}