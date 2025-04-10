import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { AuthService } from '../../service/login-service/login.service'
import { User } from '../../model/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule], // ✅ Add FormsModule here
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {


  public username: string = '';	
  public password: string = '';

  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.user = this.route.snapshot.params['id'];
    // console.log(this.user);
  }

  

  private AuthResponseDto = {
    token: ''
  }
  

  login() {
    console.log(this.username, this.password);
    this.authservice.login(this.username, this.password).subscribe(data => {
      console.log(data);
      localStorage.setItem('userEmail', data.email)
      this.authservice.setCurrentUser(data);
      this.authservice.storeToken(data.token);
      this.AuthResponseDto = data
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Login failed', error);
      // alert("Invalid credentials");
      this.router.navigate(['/signup'])
    }
  );
  }
}
