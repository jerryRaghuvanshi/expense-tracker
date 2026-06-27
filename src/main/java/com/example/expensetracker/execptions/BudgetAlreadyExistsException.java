package com.example.expensetracker.execptions;

public class BudgetAlreadyExistsException extends RuntimeException{
    public BudgetAlreadyExistsException(String message) {
        super(message);
    }
}
