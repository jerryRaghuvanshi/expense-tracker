package com.example.expensetracker.specification;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.entity.User;
import org.springframework.data.jpa.domain.Specification;

import java.time.Month;

public class ExpenseSpecification {
    public static Specification<Expense> hasUser(User user) {
        return (root,
                criteriaQuery,
                cb) -> {
            if(user==null)
                return cb.conjunction();

            return cb.equal(root.get("user").get("id"), user.getId());
        };

    }
    public static Specification<Expense> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.isBlank()) {
                return cb.conjunction(); // Returns a neutral SQL condition (1=1) that won't filter out data
            }

            String searchPattern = "%" + keyword.trim().toLowerCase() + "%";
            return cb.like(cb.lower(root.get("description")), searchPattern);
        };
    }

    public static Specification<Expense> hasCategory(

            Long categoryId

    ){

        return (root,query,cb)->{


            if(categoryId==null)
                return cb.conjunction();


            return cb.equal(

                    root.get("category")
                            .get("id"),

                    categoryId

            );

        };


    }
    public static Specification<Expense>

    hasMonth(

            Month month

    ){

        return (

                root,

                query,

                cb

        )->{


            if(month==null)

                return cb.conjunction();



            return cb.equal(



                    cb.function(

                            "MONTH",

                            Integer.class,

                            root.get(

                                    "expenseDate"

                            )

                    ),

                    month.getValue()

            );


        };

    }
    public static Specification<Expense>

    hasYear(

            Integer year

    ){



        return (

                root,

                query,

                cb

        )->{


            if(year==null)

                return cb.conjunction();




            return cb.equal(



                    cb.function(

                            "YEAR",

                            Integer.class,

                            root.get(

                                    "expenseDate"

                            )

                    ),

                    year

            );



        };

    }
}
