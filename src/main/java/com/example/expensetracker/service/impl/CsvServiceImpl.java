package com.example.expensetracker.service.impl;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.service.CsvService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvServiceImpl implements CsvService {


    private final ExpenseRepository expenseRepository;


    @Override
    public ByteArrayInputStream exportExpenses(User user) {
        List<Expense> expenses =

                expenseRepository.findByUser(user);
        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        PrintWriter writer =

                new PrintWriter(out);
        writer.println(

                "Id,Amount,Category,Description,Date"

        );
        for(Expense expense : expenses){

            writer.println(

                    expense.getId()+","+

                            expense.getAmount()+","+

                            expense.getCategory().getName()+","+

                            expense.getDescription()+","+

                            expense.getExpenseDate()

            );

        }
        writer.flush();
        return new ByteArrayInputStream(

                out.toByteArray()

        );
    }
}