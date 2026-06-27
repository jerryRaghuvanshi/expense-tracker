package com.example.expensetracker.execptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Email Exist

    @ExceptionHandler(
            EmailAlreadyExistsException.class
    )
    public ResponseEntity<ErrorResponse>

    handleEmailExists(

            EmailAlreadyExistsException ex

    ){

        ErrorResponse response =

                ErrorResponse.builder()

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .status(
                                HttpStatus.CONFLICT.value()
                        )

                        .message(
                                ex.getMessage()
                        )

                        .build();


        return ResponseEntity

                .status(
                        HttpStatus.CONFLICT
                )

                .body(response);


    }

    // User Not Found

    @ExceptionHandler(
            UserNotFoundException.class
    )
    public ResponseEntity<ErrorResponse>

    handleUserNotFound(

            UserNotFoundException ex

    ){

        ErrorResponse response =

                ErrorResponse.builder()

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .status(
                                HttpStatus.NOT_FOUND.value()
                        )

                        .message(
                                ex.getMessage()
                        )

                        .build();



        return ResponseEntity

                .status(HttpStatus.NOT_FOUND)

                .body(response);
    }


//    Validation

    @ExceptionHandler(
            MethodArgumentNotValidException.class
    )
    public ResponseEntity<?> handleValidation(

            MethodArgumentNotValidException ex

    ){

        Map<String,String> errors =
                new HashMap<>();



        ex.getBindingResult()

                .getFieldErrors()

                .forEach(error ->

                        errors.put(

                                error.getField(),

                                error.getDefaultMessage()

                        )

                );


        return ResponseEntity

                .badRequest()

                .body(errors);
    }

    //FallBack

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>

    handleGeneral(

            Exception ex

    ){

        ErrorResponse response =

                ErrorResponse.builder()

                        .timestamp(

                                LocalDateTime.now()

                        )

                        .status(

                                HttpStatus.INTERNAL_SERVER_ERROR.value()

                        )

                        .message(

                                ex.getMessage()

                        )

                        .build();



        return ResponseEntity

                .status(

                        HttpStatus.INTERNAL_SERVER_ERROR

                )

                .body(response);
    }
    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleCategoryAlreadyExist(
            CategoryAlreadyExistsException ex){
        ErrorResponse response =

                ErrorResponse.builder()

                        .timestamp(
                                LocalDateTime.now()
                        )

                        .status(
                                HttpStatus.CONFLICT.value()
                        )

                        .message(
                                ex.getMessage()
                        )

                        .build();


        return ResponseEntity

                .status(
                        HttpStatus.CONFLICT
                )

                .body(response);


    }

}
