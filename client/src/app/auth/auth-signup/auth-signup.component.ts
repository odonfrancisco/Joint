import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  newUser = {
    username: '',
    password: ''
  }

  error: string;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(){
    this.session.signup(this.newUser)
      .subscribe(
        user => {
          this.router.navigate([''])
        },
        err => {
          console.error(err);
          this.error = err;
        }
      )
  }

}
