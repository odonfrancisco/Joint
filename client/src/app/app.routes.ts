import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';

export const routes: Routes = [
    // {path: '', component: AppComponent},
    {path: 'signup', component: AuthSignupComponent},
    {path: 'login', component: AuthLoginComponent}
]