package com.example.expensetracker.repository;

import com.example.expensetracker.entity.Budget;
import com.example.expensetracker.entity.Category;
import com.example.expensetracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget,Long> {
    Optional<Budget>


    findByCategoryAndMonthAndYearAndUser(

            Category category,

            Month month,

            Integer year,

            User user

    );
    List<Budget> findByUser(User user);
    Optional<Budget> findByIdAndUser(
            Long id,
            User user
    );

    @Query("""

SELECT


COALESCE(

SUM(b.amount),

0

)


FROM Budget b


WHERE


b.user=:user


AND


b.month=:month


AND


b.year=:year


""")
    BigDecimal getTotalBudget(

            @Param("user")
            User user,

            @Param("month")
            Integer month,

            @Param("year")
            Integer year

    );

}
