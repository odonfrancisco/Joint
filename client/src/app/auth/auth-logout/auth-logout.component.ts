import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-auth-logout',
  template: '',
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private session: SessionService,
  ) { }

  ngOnInit() {
    this.session.logout()
      .subscribe(
        res => this.router.navigate(['home'])
      )
  }

}
