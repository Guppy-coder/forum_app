package com.exittest.exit_test_backend.repository;

import com.exittest.exit_test_backend.model.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {
}
