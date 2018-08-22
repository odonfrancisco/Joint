import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// Why this doesn't work when importing from environment.prod
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  url: String = environment.BASE_URL;

  constructor(
    private http: Http,
  ) {}

  handleError(e) {
    return throwError(e.json().message);
  };

  signup(user) {
    return this.http.post(`${this.url}/auth/signup`, user)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  };

  login(user) {
    return this.http.post(`${this.url}/auth/login`, user)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  };

  isLoggedIn(){
    return this.http.get(`${this.url}/auth/loggedin`)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  };
  
}
