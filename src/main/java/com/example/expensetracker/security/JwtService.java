package com.example.expensetracker.security;

import com.example.expensetracker.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private Key getSignInKey(){

        byte[] keyBytes =
                Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);

    }
    public String generateToken(User user){

        return Jwts.builder()

                .subject(user.getEmail())

                .issuedAt(new Date(System.currentTimeMillis()))

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expirationTime
                        )
                )

                .signWith(
                        getSignInKey()
                )

                .compact();

    }
    public String extractUsername(String token){

        return extractClaim(
                token,
                Claims::getSubject
        );

    }
    public <T> T extractClaim(
            String token,
            Function<Claims,T> resolver
    ){

        Claims claims =
                extractAllClaims(token);

        return resolver.apply(claims);

    }
    private Claims extractAllClaims(
            String token
    ){

        return Jwts.parser()

                .verifyWith(
                        (SecretKey)getSignInKey()
                )

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private boolean isTokenExpired(String token){

        return extractExpiration(token)
                .before(new Date());

    }

    public boolean validateToken(
            String token,
            UserDetails user
    ) {

        String username = extractUsername(token);

        return username.equals(
                user.getUsername()
        )

                &&

                !isTokenExpired(token);

    }
}
