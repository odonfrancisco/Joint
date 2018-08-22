import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

import { SessionService } from './services/session.service';

import { AppComponent } from './app.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSignupComponent,
    AuthLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ SessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
