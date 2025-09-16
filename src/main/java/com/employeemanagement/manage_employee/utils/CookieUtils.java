/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.employeemanagement.manage_employee.utils;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 *
 * @author pranavtitambe
 */
@Component
public class CookieUtils {

    public Cookie createCookie(String token, String name, HttpServletRequest request) {
        Cookie jwtCookie = new Cookie(name, token);
        jwtCookie.setMaxAge(60 * 60 * 24); // 24 hours
        jwtCookie.setSecure(!"localhost".equals(request.getServerName())); // Secure true only in prod
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");

        // Set domain only in production
        String serverName = request.getServerName();
        if (!"localhost".equals(serverName)) {
            jwtCookie.setDomain("pranavtitambe.in");
        }

        return jwtCookie;
    }

    public Cookie deleteCookie(Cookie cookie, HttpServletResponse response, HttpServletRequest request) {
        cookie.setValue("");
        cookie.setPath("/");
        cookie.setMaxAge(0);

        if (!"localhost".equals(request.getServerName())) {
            cookie.setDomain("pranavtitambe.in");
        }

        response.addCookie(cookie);
        return cookie;
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
