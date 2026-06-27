package com.example.expensetracker.security;

import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {


    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(

            HttpServletRequest request,

            HttpServletResponse response,

            Authentication authentication

    ) throws IOException {
        OAuth2User oauthUser =

                (OAuth2User)

                        authentication.getPrincipal();

        String email =

                oauthUser.getAttribute(

                        "email"

                );



        String name =


                oauthUser.getAttribute(

                        "name"

                );

        User user =


                userRepository.findByEmail(

                                email

                        )


                        .orElse(null);

        if(user==null){


            user = new User();


            user.setEmail(email);


            user.setUsername(name);



            user.setPassword(

                    UUID.randomUUID().toString()

            );



            userRepository.save(

                    user

            );



        }
        String token =

                jwtService.generateToken(

                        user
                );
        String redirectUrl =


                "http://localhost:5173/oauth-success?token="

                        +token;



        getRedirectStrategy()

                .sendRedirect(

                        request,

                        response,

                        redirectUrl

                );
    }



}
