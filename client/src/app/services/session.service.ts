import { Injectable } from '@angular/core';
import { Http , Request, RequestMethod} from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// Why this doesn't work when importing from environment.prod
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: String = environment.BASE_URL;
  currentUser: Object;
  tempUser: any;

  constructor(
    private http: Http,
  ) {}

  handleError(e) {
    this.currentUser = null;
    return throwError(e.json().message);
  };

  signup(user) {
    return this.http.post(`${this.url}/auth/signup`, {
        data: user},
        {withCredentials: true})
      .pipe(
        map(res => {
          this.currentUser = res.json();
          res.json();
        }),
        catchError(this.handleError)
      );
  };

  login(user) {
    return this.http.post(`${this.url}/auth/login`, user, {
      withCredentials:true
    })
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  };

  isLoggedIn(){
    return this.http.get(`${this.url}/auth/loggedin`, {
      withCredentials: true
    })
      .pipe(
        map(res => {
          this.tempUser = res;
          this.currentUser = JSON.parse(this.tempUser._body);
          return this.currentUser
        }),
      );
  };

  logout(){
    return this.http.get(`${this.url}/auth/logout`, {
      withCredentials: true
    })
      .pipe(
        map(res => {
          this.currentUser = null;
          this.tempUser = null;
          return res.json()
        })
      )
  }

}
