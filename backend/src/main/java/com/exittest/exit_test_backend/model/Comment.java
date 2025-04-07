package com.exittest.exit_test_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comment")
@Setter
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String description;
    int likes;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}