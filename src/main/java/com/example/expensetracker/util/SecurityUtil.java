package com.example.expensetracker.util;

import com.example.expensetracker.entity.User;
import com.example.expensetracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {

    private final UserService userService;


    public User getCurrentUser(
            Authentication authentication
    ){

        return userService.findByEmail(
                authentication.getName()
        );

    }

}
