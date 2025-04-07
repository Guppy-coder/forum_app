package com.exittest.exit_test_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "question")
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "question_id")
    Long id;
    private String title;
    private String description;
    @ElementCollection
    private List<String> tags;
    private Date date;
    private int likes;
    @Setter
    private boolean state;

    @Column(name = "product_code")
    String productCode;

    @OneToMany(mappedBy = "question")
    private List<Comment> comments;

    public boolean getState(){
        return this.state;
    }
}
