import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../service/comment/comment.service';

@Component({
  selector: 'app-comment',
  imports: [FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  constructor(private commentService: CommentService) {}

  @Input() questionId: number = 0;

  commentText: string = '';
  submitComment(comment: string) {
    console.log(`Comment for Question ID ${this.questionId}:`, comment);
    this.commentService.postComment(comment, this.questionId).subscribe(response => {
      this.commentText = ''; // Clear the comment input after posting
    })
  }
}
