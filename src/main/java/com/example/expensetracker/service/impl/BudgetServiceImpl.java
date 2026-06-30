package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.budgetDto.BudgetRequest;
import com.example.expensetracker.dto.budgetDto.BudgetResponse;
import com.example.expensetracker.entity.Budget;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import com.example.expensetracker.execptions.BudgetAlreadyExistsException;
import com.example.expensetracker.execptions.BudgetNotFoundException;
import com.example.expensetracker.execptions.CategoryNotFoundException;
import com.example.expensetracker.mapper.BudgetMapper;
import com.example.expensetracker.repository.BudgetRepository;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.service.BudgetService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BudgetServiceImpl implements BudgetService {
    private final BudgetRepository budgetRepository;
    private final BudgetMapper budgetMapper;
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;

    @Override
    public BudgetResponse createBudget(BudgetRequest request, User user) {


        Category category = categoryRepository.findByIdAndUser(request.getCategoryId(), user)
                .orElseThrow(()->new CategoryNotFoundException(
                        "Category not found"));


        if(

                budgetRepository

                        .findByCategoryAndMonthAndYearAndUser(

                                category,
                                request.getMonth(),

                                request.getYear(),
                                user

                        )

                        .isPresent()

        ){


            throw new BudgetAlreadyExistsException(

                    "Budget already exists"

            );

        }

        Budget  budget = budgetMapper.toEntity(request);

        budget.setUser(user);
        budget.setCategory(category);

        Budget savedBudget =


                budgetRepository.save(

                        budget

                );



        BudgetResponse response =


                budgetMapper.toResponse(

                        savedBudget

                );



        response.setSpent(

                BigDecimal.ZERO

        );



        response.setRemaining(

                savedBudget.getAmount()

        );



        return response;

    }

    @Override
    public List<BudgetResponse> getBudgets(User user) {

        List<Budget> budgets =
                budgetRepository.findByUser(user);


        return budgets.stream()

                .map(budget -> {


                    BigDecimal spent = expenseRepository.getSpentAmountByCategory(

                            user,

                            budget.getCategory().getId(),

                            budget.getMonth().getValue(),

                            budget.getYear()

                    );


                    BudgetResponse response =
                            budgetMapper.toResponse(budget);


                    response.setSpent(spent);

                    response.setRemaining(

                            budget.getAmount().subtract(spent)

                    );


                    return response;

                })

                .toList();
    }

    @Override
    public void deleteBudget(Long id, User user) {


        Budget budget = budgetRepository.findByIdAndUser(id,user).
                orElseThrow(()->new BudgetNotFoundException("Budget does not exists"));
        budgetRepository.delete(budget);

    }

    @Override
    public BudgetResponse updateBudget(

            Long id,

            BudgetRequest request,

            User user

    ){


        Budget budget =


                budgetRepository.findByIdAndUser(

                                id,

                                user

                        )


                        .orElseThrow(

                                ()->new BudgetNotFoundException(

                                        "Budget does not exist"

                                )

                        );



        Category category =


                categoryRepository.findByIdAndUser(

                                request.getCategoryId(),

                                user

                        )

                        .orElseThrow(

                                ()->new CategoryNotFoundException(

                                        "Category not found"

                                )

                        );



        budgetMapper.updateBudget(

                request,

                budget

        );



        budget.setCategory(

                category

        );

        BigDecimal spent =

                expenseRepository.getSpentAmountByCategory(

                        user,

                        budget.getCategory().getId(),

                        budget.getMonth().getValue(),

                        budget.getYear()

                );

        BudgetResponse response = budgetMapper.toResponse(budget);

        response.setSpent(spent);

        response.setRemaining(
                budget.getAmount().subtract(spent)
        );

        return response;


    }


}
