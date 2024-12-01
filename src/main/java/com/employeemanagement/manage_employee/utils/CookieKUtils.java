/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.utils;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

/**
 *
 * @author pranavtitambe
 */
@Component
public class CookieKUtils {
    public Cookie createCookie(String token,String name) {
        Cookie jwtCookie = new Cookie(name, token);
        jwtCookie.setMaxAge(60 * 60 * 24);
        jwtCookie.setSecure(false);  // Enable this for production
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setDomain("localhost");
        // jwtCookie.setSameSite(Cookie.SameSite.LAX);
        return jwtCookie;
    }

    public void deleteCookie(Cookie cookie){
        cookie.setMaxAge(0);
    }

    public Cookie getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie;
                }
            }
        }
        return null;
    }


}
