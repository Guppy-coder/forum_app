import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../service/stats/stats.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage',
  imports: [FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit {
  constructor(private statsService: StatsService) { }

  numberOfusers: number = 0;
  numberOfQuestions: number = 0;
  ngOnInit(): void {
    this.statsService.getUsers().subscribe(data => {
      this.numberOfusers = data;
      console.log(this.numberOfusers);
    });

    this.statsService.getQuestions().subscribe(data => {
      this.numberOfQuestions = data;
      console.log(this.numberOfQuestions);
    });
  }
  title = 'The Community';
}
