package com.employeemanagement.manage_employee.controller;

import java.sql.Timestamp;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.manage_employee.entity.AdminDetails;
import com.employeemanagement.manage_employee.entity.EmployeeDetails;
import com.employeemanagement.manage_employee.entity.LoginRequest;
import com.employeemanagement.manage_employee.entity.LoginTimeDetails;
import com.employeemanagement.manage_employee.entity.ManagerDetails;
import com.employeemanagement.manage_employee.repository.AdminInfo;
import com.employeemanagement.manage_employee.repository.EmployeeInfo;
import com.employeemanagement.manage_employee.repository.LoginTimeInfo;
import com.employeemanagement.manage_employee.repository.ManagerInfo;
import com.employeemanagement.manage_employee.response.AdminResponse;
import com.employeemanagement.manage_employee.response.EmployeeResponse;
import com.employeemanagement.manage_employee.response.ManagerResponse;
import com.employeemanagement.manage_employee.utils.CookieUtils;
import com.employeemanagement.manage_employee.utils.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class LoginTimeController {

    private final Logger logger = Logger.getLogger(LoginTimeController.class.getName());

    private final AuthenticationManager authenticationManager;

    private final EmployeeInfo employeeInfo;

    private final ManagerInfo managerInfo;

    private final AdminInfo adminInfo;

    private final LoginTimeInfo loginTimeInfo;

    private final BCryptPasswordEncoder bcrypt;

    private final JwtUtils jwt;

    @Autowired
    private CookieUtils cookieKUtils;
    @Autowired
    private HttpSession session;

    public LoginTimeController(AuthenticationManager authenticationManager,
            EmployeeInfo employeeInfo,
            ManagerInfo managerInfo,
            AdminInfo adminInfo,
            LoginTimeInfo loginTimeInfo,
            BCryptPasswordEncoder bcrypt, JwtUtils jwt) {
        this.authenticationManager = authenticationManager;
        this.employeeInfo = employeeInfo;
        this.managerInfo = managerInfo;
        this.adminInfo = adminInfo;
        this.loginTimeInfo = loginTimeInfo;
        this.bcrypt = bcrypt;
        this.jwt = jwt;

    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> createLoginTimeEmployee(@RequestBody LoginRequest loginRequest, HttpServletRequest request,
            HttpServletResponse response) {

        EmployeeDetails employeeDetails = employeeInfo.findByEmail(loginRequest.getEmail());
        AdminDetails adminDetails = adminInfo.findByAdmemail(loginRequest.getEmail());
        ManagerDetails managerDetails = managerInfo.findByMngemail(loginRequest.getEmail());
        LoginTimeDetails loginTimeDetails = new LoginTimeDetails();

        System.out.println("Employee Details: " + employeeDetails);
        System.out.println("Admin Details: " + adminDetails);
        System.out.println("Manager Details: " + managerDetails);

        if (employeeDetails != null && bcrypt.matches(loginRequest.getPassword(), employeeDetails.getPassword())) {

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            // Creating a jwt token
            String jwtToken = jwt.generateToken(loginRequest.getEmail());
            request.getSession().setAttribute("employee_jwt", jwtToken);
            // Adding jwt token to the response
            response.addCookie(cookieKUtils.createCookie(jwtToken, "employee_jwt"));
            // response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(employeeDetails.getEmail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeDetails.setRole("EMPLOYEE");
            loginTimeInfo.save(loginTimeDetails);
            EmployeeResponse empResponse = new EmployeeResponse(jwtToken, employeeDetails, loginTimeDetails);
            logger.info("Employee Logged in Successfully!!!");
            return new ResponseEntity<>(empResponse, HttpStatus.OK);
        }

        if (adminDetails != null && bcrypt.matches(loginRequest.getPassword(), adminDetails.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwt.generateToken(loginRequest.getEmail());

            request.getSession().setAttribute("admin_jwt", jwtToken);
            // Adding jwt token to the response
            response.addCookie(cookieKUtils.createCookie(jwtToken, "admin_jwt"));
            // response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(adminDetails.getAdmemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("ADMIN");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));

            // Giving custom response to the user

            loginTimeInfo.save(loginTimeDetails);
            AdminResponse admResponse = new AdminResponse(jwtToken, adminDetails, loginTimeDetails);
            logger.info("Admin Logged in Successfully!!!");
            return new ResponseEntity<>(admResponse, HttpStatus.OK);
        }

        if (managerDetails != null && bcrypt.matches(loginRequest.getPassword(), managerDetails.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwt.generateToken(loginRequest.getEmail());
            // Cookie jwtCookie = cookieKUtils.createCookie(jwtToken,"jwt");

            // Adding jwt token to the response
            request.getSession().setAttribute("manager_jwt", jwtToken);
            // Adding jwt token to the response
            response.addCookie(cookieKUtils.createCookie(jwtToken, "manager_jwt"));
            // response.setHeader("jwt-cookie", jwtToken);
            loginTimeDetails.setEmail(managerDetails.getMngemail());
            loginTimeDetails.setLogin_time(new Timestamp(System.currentTimeMillis()));
            loginTimeDetails.setRole("MANAGER");
            loginTimeDetails.setPassword(bcrypt.encode(loginRequest.getPassword()));
            loginTimeInfo.save(loginTimeDetails);

            // Giving custom response to the user
            ManagerResponse mngResponse = new ManagerResponse(jwtToken, managerDetails, loginTimeDetails);
            logger.info("Manager Logged in Successfully!!!");
            return new ResponseEntity<>(mngResponse, HttpStatus.OK);
        }
        logger.log(Level.WARNING, "Login failed for email: {0}", loginRequest.getEmail());
        return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    }    

    @PutMapping("auth/logout/{time_id}/{token}")
    public ResponseEntity<?> createLogoutTime(HttpServletRequest request,
            @PathVariable String time_id,
            @PathVariable String token, HttpServletResponse response) {

        LoginTimeDetails loginTimeDetails = loginTimeInfo.findById(time_id).orElse(null);

        if (loginTimeDetails != null) {
            loginTimeDetails.setLogout_time(new Timestamp(System.currentTimeMillis()));
            loginTimeInfo.save(loginTimeDetails);

            Cookie employeeCookie = cookieKUtils.getCookie(request, "employee_jwt");
            Cookie adminCookie = cookieKUtils.getCookie(request, "admin_jwt");
            Cookie managerCookie = cookieKUtils.getCookie(request, "manager_jwt");

            if (employeeCookie != null) {
                cookieKUtils.deleteCookie(employeeCookie, response);
                jwt.addBlackListToken(token);
                logger.log(Level.INFO, "{0} is blacklisted and Employee logged out successfully", token);
                return new ResponseEntity<>("Employee Logged out Successfully!!!", HttpStatus.OK);
            } else if (adminCookie != null) {
                cookieKUtils.deleteCookie(adminCookie, response);
                jwt.addBlackListToken(token);
                logger.log(Level.INFO, "{0} is blacklisted and Admin logged out successfully", token);
                return new ResponseEntity<>("Admin Logged out Successfully!!!", HttpStatus.OK);
            } else if(managerCookie != null) {
                cookieKUtils.deleteCookie(managerCookie, response);
                jwt.addBlackListToken(token);
                logger.log(Level.INFO, "{0} is blacklisted and Manager logged out successfully", token);
                return new ResponseEntity<>("Manager Logged out Successfully!!!", HttpStatus.OK);
            }
            else{
                logger.log(Level.SEVERE, "Something went wrong while logging out, may be due to invalid token or cookie");
                return new ResponseEntity<>("Token not found", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Login time details not found.", HttpStatus.NOT_FOUND);
        }
    }
}
