package com.exittest.exit_test_backend.api;

import com.exittest.exit_test_backend.model.Question;
import com.exittest.exit_test_backend.repository.QuestionRepository;
import com.exittest.exit_test_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    @Autowired
    UserRepository userRepo;
    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/postQuestion")
    public ResponseEntity<?> postComment(@RequestBody Question question){
        question.setState(true);
        questionRepository.save(question);
        return ResponseEntity.ok("Question Posted");
    }

    @PutMapping("/close/{id}")
    public ResponseEntity<?> closeQuestion(@PathVariable("id") Long id){
        Optional<Question> questionOptional = questionRepository.findById(id);
        questionOptional.get().setState(false);
        return ResponseEntity.ok("Question Closed");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable("id") Long id){
        Question question = questionRepository.findById(id).get();
        questionRepository.delete(question);
        return ResponseEntity.ok("Question Deleted");
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<String> likeComment(@PathVariable("id") Long id){
        Optional<Question> questionOptional = questionRepository.findById(id);
        if (questionOptional.isPresent()){
            Question comment = questionOptional.get();
            if (comment.getState()) {
                int likes = comment.getLikes() + 1;
                comment.setLikes(likes);
                questionRepository.save(comment);
                return ResponseEntity.ok("Comment liked");
            }
        }
        return ResponseEntity.badRequest().body("Oops something went wrong...");
    }
}
