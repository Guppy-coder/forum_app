package com.exittest.exit_test_backend.api;

import com.exittest.exit_test_backend.model.Comment;
import com.exittest.exit_test_backend.model.Question;
import com.exittest.exit_test_backend.repository.CommentRepository;
import com.exittest.exit_test_backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/comment/{id}")
    public ResponseEntity<String> postComment(@PathVariable("id") Long id, @RequestBody Comment comment){
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();
            if (question.getState()){
                question.getComments().add(comment);
                questionRepository.save(question);
                comment.setQuestion(question);
                commentRepository.save(comment);
                return ResponseEntity.ok("Comment Added");
            }
        }
        return ResponseEntity.badRequest().body("Question is closed");
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<String> likeComment(@PathVariable("id") Long id){
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()){
            Comment comment = commentOptional.get();
            int likes = comment.getLikes()+1;
            comment.setLikes(likes);
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment liked");
        }
        return ResponseEntity.badRequest().body("Oops something went wrong...");
    }

}