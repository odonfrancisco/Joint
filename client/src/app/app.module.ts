// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Routes
import { routes } from './app.routes';

// Services
import { SessionService } from './services/session.service';
import { RestaurantService } from './services/restaurant/restaurant.service';
import { MenuService } from './services/menu/menu.service';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';

// Components
import { AppComponent } from './app.component';
import { AuthSignupComponent } from './auth/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { HomeComponent } from './home/home.component';
import { AppOrderComponent } from './customer/app-order/app-order.component';
import { AppMenuComponent } from './customer/app-menu/app-menu.component';
import { PlaceOrderComponent } from './customer/place-order/place-order.component';
import { OrderService } from './services/order/order.service';
import { WholeOrderComponent } from './customer/whole-order/whole-order.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSignupComponent,
    AuthLoginComponent,
    HomeComponent,
    FilterPipe,
    AppOrderComponent,
    AppMenuComponent,
    PlaceOrderComponent,
    WholeOrderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ SessionService, RestaurantService, MenuService, OrderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
