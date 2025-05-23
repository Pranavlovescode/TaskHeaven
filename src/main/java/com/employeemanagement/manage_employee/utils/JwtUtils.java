package com.employeemanagement.manage_employee.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.employeemanagement.manage_employee.entity.TokenStorage;
import com.employeemanagement.manage_employee.repository.TokenStorageInfo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Autowired
    private TokenStorageInfo tokenStorageInfo;

    private final String SECRET_KEY = "TaK+HaV^uvCHEFsEVfypW#7g9^k*Z8$V";


    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .header().empty().add("type", "JWT")
                .and()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1 day expiration time
                .signWith(getSigningKey())
                .compact();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    


    public void addBlackListToken(String token){
        // Add token to database
        TokenStorage tokenStorage = new TokenStorage();
        tokenStorage.setToken(token);
        tokenStorageInfo.save(tokenStorage);
    }

    public boolean isBlackListed(String token){
        // Check if token is blacklisted
        TokenStorage tokenStorage = tokenStorageInfo.findByToken(token);
        return tokenStorage != null;
    }

}
