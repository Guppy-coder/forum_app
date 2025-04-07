package com.exittest.exit_test_backend.repository;

import com.exittest.exit_test_backend.model.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
}
