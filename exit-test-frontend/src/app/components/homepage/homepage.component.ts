import { Component } from '@angular/core';
import { SearchService } from '../../service/question/question.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/login-service/login.service';
import { OnInit } from '@angular/core';
import { CommentComponent } from "../comment/comment.component";
import { Question } from '../../model/question/question';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [FormsModule, CommonModule]
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  isLoading: boolean = false;
  searchResults: Question[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private authService: AuthService
  ) {
    this.searchMyQuestions();
  }

  ngOnInit(): void {
    if(!localStorage.getItem('userEmail')) {
      this.router.navigate(['/login']);
    }
    this.searchMyQuestions(); // Call the method to fetch user's questions on component initialization
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      
      this.searchService.searchQuestions(this.searchQuery).subscribe( results => { 
        this.searchResults = results; 
        console.log(this.searchResults);
        this.isLoading = false
      });
    }
  }

  // Example of advanced search
  searchMyQuestions(): void {
    const userEmail = this.authService.getCurrentUser(); // Get from auth service
    console.log(userEmail.email);
    this.searchService.searchQuestions(undefined, undefined, localStorage.getItem('userEmail') || undefined)
      .subscribe(results => {
        this.searchResults = results;
        console.log(this.searchResults);
      });
  }

  navigateToQuestion(questionId: number): void {
    this.router.navigate(['/questions', questionId]);
  }

  likeQuestion(questionId: number): void {
    this.searchService.likeQuestion(questionId).subscribe(response => {
      console.log('Question liked:', response);
      // Optionally refresh the search results or update the UI
    });
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}