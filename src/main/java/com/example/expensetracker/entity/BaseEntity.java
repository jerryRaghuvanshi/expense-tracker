package com.example.expensetracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @CreationTimestamp
    @Column(
            name = "created_on",
            nullable = false,
            updatable = false
    )
    private Instant createdOn;



    @UpdateTimestamp
    @Column(
            name = "updated_on",
            nullable = false
    )
    private Instant updatedOn;

}
