import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-admin-restaurant-menu-view',
  templateUrl: './admin-restaurant-menu-view.component.html',
  styleUrls: ['./admin-restaurant-menu-view.component.css']
})
export class AdminRestaurantMenuViewComponent implements OnInit {
  @Input() menuId;

  menu: Object;
  Drinks = {hide: true};

  constructor(
    private menuServ: MenuService,
  ) { }

  ngOnInit() {
    this.menuServ.getMenu(this.menuId)
      .subscribe(menu => {
        this.menu = menu;
      })
  }

}
