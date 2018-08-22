import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  user: any;
  
  constructor(
    public session: SessionService
  ){}
  
  ngOnInit(){
    this.session.isLoggedIn()
      .subscribe(
        user => {
          this.user = user;
        },
        err => {
          console.error(err);
        }
      )
  }
  
}
