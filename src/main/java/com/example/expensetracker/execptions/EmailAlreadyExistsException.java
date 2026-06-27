package com.example.expensetracker.execptions;


public class EmailAlreadyExistsException
        extends RuntimeException{

    public EmailAlreadyExistsException(String message){
        super(message);
    }

}
