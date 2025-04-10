import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../service/question/question.service';
import { Question } from '../../model/question/question';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-page',
  imports: [CommonModule, CommentComponent, ReactiveFormsModule],
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.css'
})
export class CommentPageComponent implements OnInit {

  question: Question = {id: 0, 
    title: '', 
    description: '', 
    productCode: '', 
    status: false, 
    likes: 0, 
    userEmail: '', 
    tags: [], 
    date: '',
    comments: []
  };

  constructor(private route: ActivatedRoute, private questionService: SearchService) { }

  ngOnInit(): void {
    const questionId = this.route.snapshot.paramMap.get('id');
    if (!questionId) {
      console.error('Question ID is not available in the route parameters.');
      return;
    }
    this.questionService.getQuestionById(Number(questionId)).subscribe((res: Question) => {
      this.question = res;
      console.log(this.question);
    });
  }

  likeQuestion(questionId: number): void {
    this.questionService.likeQuestion(questionId).subscribe(response => {
      console.log('Question liked:', response);
    });
  }

}
