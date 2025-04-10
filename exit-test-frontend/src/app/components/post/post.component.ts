import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PostComponent {
  topicForm: FormGroup;
  userEmail : string = localStorage.getItem('userEmail') || '';
  date: string = new Date().toLocaleDateString();
  products: string[] = ['Product A', 'Product B', 'Product C'];

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.topicForm = this.fb.group({
      subject: ['', Validators.required],
      product: ['', Validators.required],
      body: ['']
    });
  }

  onSubmit() {
    if (this.topicForm.valid) {
      this.postService.createPost(this.topicForm.value['subject'], 
        this.topicForm.value['body'], 
        this.userEmail, this.date, 
        this.topicForm.value['product'].slice(0,3) + this.topicForm.value['product'][-1]).subscribe()
      this.router.navigate(['/dashboard']);
    }
  }

  onCancel() {
    this.topicForm.reset();
  }
}
