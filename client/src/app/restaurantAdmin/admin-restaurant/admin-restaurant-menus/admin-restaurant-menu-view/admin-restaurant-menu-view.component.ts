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
  visible: Object = {};
  newItem = {
    name:'',
    description: '',
    ingredients: [],
    price: 10,
    picture: '',
  };
  ingredient: String;
  error: any;

  hideModal;

  constructor(
    private menuServ: MenuService,
  ) { }

  ngOnInit() {
    this.getMenu('init');
  }

  capitalize(str){
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }

  getMenu(ifInit){
    this.menuServ.getMenu(this.menuId)
      .subscribe(menu => {
        this.menu = menu;
        if(ifInit){
          this.menu['subMenus'].forEach(subMenu => {
            this.visible[subMenu.category] = {hide: true}
          })
        }
      })
  }

  toggleCategoryView(category){
    switch(this.visible[category].hide){
      case true: this.visible[category].hide = false; break;
      case false: this.visible[category].hide = true; break;
    }
  }
  
  showModal(element, category) {
    const modal = document.getElementById(element);
    // console.log(element)
    // console.log(modal)
    const span = modal.children[0].children[0];

    modal.style.display = "block";

    // console.log(this.menuItems)
    // console.log(element)

    this.newItem['category'] = category;
    this.newItem['name'] ='',
    this.newItem['description'] = '',
    this.newItem['ingredients'] = [],
    this.newItem['price'] = 10,
    this.newItem['picture'] = '',

    // Finds item user is viewing from menuItems 
      // and makes that item equal to the active item 
    // this.item = this.m enuItems.filter(e => e['_id'] === element.split('-')[0])[0]
    // this.item['modifications'] = [];
    // console.log(this.item)

    span.addEventListener('click', () => {
      modal.style.display = 'none';
      // this.item = null;
      // this.quantity = 1;
      // this.comments = null;
    })

    this.hideModal = () => {
      modal.style.display = 'none';
      }
    

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
        // this.item = null;
        // this.quantity = 1;
        // this.comments = null;
      }
    }
  }

  addIngredient(){
    this.newItem.ingredients.push(this.capitalize(this.ingredient));
    this.ingredient = '';
  }

  addNewItem(){
    this.menuServ.addMenuItem(this.menuId, this.newItem)
      .subscribe(
        menu => {
          this.getMenu(false);
          this.hideModal();
        },
        err => this.error = err.json()
      );
  };


}
