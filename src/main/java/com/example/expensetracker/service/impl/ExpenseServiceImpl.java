package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.expenseDto.ExpenseRequest;
import com.example.expensetracker.dto.expenseDto.ExpenseResponse;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.execptions.CategoryNotFoundException;
import com.example.expensetracker.execptions.ExpenseNotFoundException;
import com.example.expensetracker.mapper.ExpenseMapper;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.specification.ExpenseSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Month;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private  final ExpenseMapper expenseMapper;
    private final CategoryRepository categoryRepository;

    @Override
    public ExpenseResponse createExpense(ExpenseRequest expenseRequest, User user) {

        Category category = categoryRepository.findByIdAndUser(expenseRequest.getCategoryId(), user)
                .orElseThrow(()->new CategoryNotFoundException(
                        "Category not found"));

        Expense expense = expenseMapper.toEntity(expenseRequest);
        expense.setCategory(category);
        expense.setUser(user);
        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toResponse(savedExpense);
    }

    @Override
    public Page<ExpenseResponse> getExpenses(User user, Long categoryId,
                                             String keyword,
                                             Month month, Integer year,
                                             Pageable pageable)
    {
        Specification<Expense> specification =


                Specification.where(

                                ExpenseSpecification

                                        .hasCategory(

                                                categoryId

                                        )

                        )

                        .and(


                                ExpenseSpecification.hasMonth(

                                        month

                                )

                        )

                        .and(


                                ExpenseSpecification.hasYear(

                                        year

                                )

                        )
                        .and(


                                ExpenseSpecification.hasKeyword(

                                        keyword

                                )

                        )

                        .and(


                                ExpenseSpecification.hasUser(

                                        user

                                )

                        );
        Page<Expense>


                expenses =


                expenseRepository.findAll(

                        specification,

                        pageable

                );
        return expenses.map(

                expenseMapper::toResponse

        );
    }




    @Override
    public ExpenseResponse updateExpense(Long id, ExpenseRequest expenseRequest, User user) {
        Expense expense = expenseRepository.findByIdAndUser(id, user)
                .orElseThrow(()->new ExpenseNotFoundException("Expense not found"));
        expenseMapper.updateExpense(expenseRequest,expense);

        Category category = categoryRepository.findByIdAndUser(expenseRequest.getCategoryId(), user)
                .orElseThrow(()->new CategoryNotFoundException(
                        "Category not found"));
        expense.setCategory(category);

        return expenseMapper.toResponse(expense);

    }


    @Override
    public void deleteExpense(Long id, User user) {

        Expense expense =


                expenseRepository


                        .findByIdAndUser(

                                id,

                                user

                        )


                        .orElseThrow(

                                ()->new ExpenseNotFoundException(

                                        "Expense not found"

                                )

                        );
        expenseRepository.delete(expense);


    }
}
