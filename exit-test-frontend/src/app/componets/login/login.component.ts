import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../AngularAssignment/taskManagerFrontend/src/app/model/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../../AngularAssignment/taskManagerFrontend/src/app/service/login-service/login.service';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule] // ✅ Add FormsModule here
})
export class LoginComponent implements OnInit {

  // user: User = new User()
  user: { 
    id: number; 
    firstName: string; 
    lastName: string; 
    username: string; 
    email: string; 
    password: string; 
    role: string; 
  } = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: ''
  };

  public username: string = '';	
  public password: string = '';

  constructor(private loginservice: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.user = this.route.snapshot.params['id'];
    // console.log(this.user);
  }
  

  login() {
    this.loginservice.login(this.username, this.password).subscribe(data => {
      this.user = data
      if (data) {
        if (this.user.role === 'Admin'){
          this.router.navigate(['/admin-dashboard'])
        }else{
          console.log(this.user);
          this.router.navigate(['/dashboard', {'userId': this.user.id}]);
        }
        
      }
    });
  }
}
