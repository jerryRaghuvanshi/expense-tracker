package com.example.expensetracker.execptions;

public class UserNotFoundException
        extends RuntimeException{

    public UserNotFoundException(String message){
        super(message);
    }

}
