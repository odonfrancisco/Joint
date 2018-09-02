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
import { KitchenAllOrdersComponent } from './restaurantKitchen/kitchen-all-orders/kitchen-all-orders.component';
import { RestaurantAuthComponent } from './restaurant/restaurant-auth/restaurant-auth.component';
import { RestaurantMainComponent } from './restaurant/restaurant-main/restaurant-main.component';
import { AuthLogoutComponent } from './auth/auth-logout/auth-logout.component';
import { ServerAllOrdersComponent } from './restaurantServer/server-all-orders/server-all-orders.component';
import { AdminMainComponent } from './restaurantAdmin/admin-main/admin-main.component';
import { AdminRestaurantComponent } from './restaurantAdmin/admin-restaurant/admin-restaurant.component';
import { AdminRestaurantMenusComponent } from './restaurantAdmin/admin-restaurant/admin-restaurant-menus/admin-restaurant-menus.component';
import { AdminRestaurantMenuViewComponent } from './restaurantAdmin/admin-restaurant/admin-restaurant-menus/admin-restaurant-menu-view/admin-restaurant-menu-view.component';
import { AdminRestaurantMenuCreateComponent } from './restaurantAdmin/admin-restaurant/admin-restaurant-menus/admin-restaurant-menu-create/admin-restaurant-menu-create.component';
import { AdminRestaurantViewComponent } from './restaurantAdmin/admin-restaurant/admin-restaurant-view/admin-restaurant-view.component';

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
    KitchenAllOrdersComponent,
    RestaurantAuthComponent,
    RestaurantMainComponent,
    AuthLogoutComponent,
    ServerAllOrdersComponent,
    AdminMainComponent,
    AdminRestaurantComponent,
    AdminRestaurantMenusComponent,
    AdminRestaurantMenuViewComponent,
    AdminRestaurantMenuCreateComponent,
    AdminRestaurantViewComponent,
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
