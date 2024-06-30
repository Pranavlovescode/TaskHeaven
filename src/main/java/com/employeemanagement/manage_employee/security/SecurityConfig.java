package com.employeemanagement.manage_employee.security;

import com.employeemanagement.manage_employee.filters.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final CustomUserDetailsEmployee customUserDetailsEmployee;

    private final JwtFilter jwtFilter;

    public SecurityConfig(CustomUserDetailsEmployee customUserDetailsEmployee, JwtFilter jwtFilter) {
        this.customUserDetailsEmployee = customUserDetailsEmployee;
        this.jwtFilter = jwtFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/add-employee/register", "/add-manager/register", "/add-admin/register").hasRole("ADMIN")
                                .requestMatchers("/api/auth/login").permitAll()
                                .requestMatchers("/add-employee/**").hasAnyRole("MANAGER", "ADMIN")
                                .requestMatchers("/add-manager/**").hasRole("ADMIN")
                                .requestMatchers("/add-admin/**").hasRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .formLogin(login->
                        login.loginPage("http://localhost:3000")
                                .permitAll())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable);


        return http.build();
    }
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(userDetailsService()).passwordEncoder(bCryptPasswordEncoder());
//        return authenticationManagerBuilder.build();
//    }


//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)throws Exception{
//        return configuration.getAuthenticationManager();
//    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


//    @Bean
//    public UserDetailsService userDetailsService() {
//        return customUserDetailsEmployee;
//    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


}
