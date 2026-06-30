package com.example.expensetracker.repository;

import com.example.expensetracker.dto.analyticsDto.CategoryBreakdownResponse;
import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense,Long>,
        JpaSpecificationExecutor<Expense> {

    Page<Expense> findByUser(User user, Pageable pageable);
    Optional<Expense> findByIdAndUser(Long id, User user);
    List<Expense> findByUser(User user);
    @Query("""
        SELECT COALESCE(
                SUM(e.amount),
                0
        )
        FROM Expense e
        WHERE e.user = :user
        AND MONTH(e.expenseDate) = :month
        AND YEAR(e.expenseDate) = :year
    """)
    BigDecimal getSpentAmount(

            @Param("user")
            User user,

            @Param("month")
            Integer month,

            @Param("year")
            Integer year

    );

    @Query("""

SELECT new


com.example.expensetracker.dto.analyticsDto.CategoryBreakdownResponse(



e.category.name,


SUM(e.amount)



)



FROM Expense e



WHERE


e.user=:user



AND


FUNCTION(

'MONTH',

e.expenseDate

)=:month



AND


FUNCTION(

'YEAR',

e.expenseDate

)=:year



GROUP BY


e.category.name



ORDER BY


SUM(e.amount)

DESC



""")
    List<CategoryBreakdownResponse>

    getCategorySpendingBreakdown(

            @Param("user")
            User user,

            @Param("month")
            Integer month,

            @Param("year")
            Integer year


    );
    @Query("""

SELECT COALESCE(SUM(e.amount),0)

FROM Expense e

WHERE e.user = :user

AND e.category.id = :categoryId

AND MONTH(e.expenseDate) = :month

AND YEAR(e.expenseDate) = :year

""")
    BigDecimal getSpentAmountByCategory(

            @Param("user") User user,

            @Param("categoryId") Long categoryId,

            @Param("month") Integer month,

            @Param("year") Integer year

    );


}




