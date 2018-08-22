import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };

  error: String;

  constructor(
    private session: SessionService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(){
    this.session.login(this.user)
      .subscribe(
        user => {
          this.router.navigate(['/'])
        },
        err => {
          this.error = err;
        }
      )
  }

}
