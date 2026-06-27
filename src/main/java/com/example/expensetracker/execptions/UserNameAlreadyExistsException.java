package com.example.expensetracker.execptions;

public class UserNameAlreadyExistsException extends RuntimeException{
    public UserNameAlreadyExistsException(String message){
        super(message);
    }
}
