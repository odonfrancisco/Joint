import { Injectable  } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { resolve } from 'dns';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RestaurantAuthGuardService implements CanActivate{

  constructor(
    private restaurantServ: RestaurantService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const restaurantId = route.params['id'];
    const role = route.params['role'];

    return new Promise((resolve, reject) => {
      this.restaurantServ.checkUser(restaurantId, role)
      .subscribe(
        data => {
          console.log('data: ', data)
          resolve(true)
        },
        err => {
          this.router.navigate(['restaurant'])
          reject(err)
        }
      )
    })
  }
  
}
