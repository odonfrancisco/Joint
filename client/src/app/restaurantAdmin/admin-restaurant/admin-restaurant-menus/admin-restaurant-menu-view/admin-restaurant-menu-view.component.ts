import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../../../services/menu/menu.service';
import { isPromiseAlike } from 'q';

@Component({
  selector: 'app-admin-restaurant-menu-view',
  templateUrl: './admin-restaurant-menu-view.component.html',
  styleUrls: ['./admin-restaurant-menu-view.component.css']
})
export class AdminRestaurantMenuViewComponent implements OnInit {
  @Input() menuId;
  @Output() deleteMenu = new EventEmitter<any>();

  menu = {
    name: '',
    subMenus: [],
  }
  visible: Object = {};
  newItem = {
    name:'',
    description: '',
    ingredients: [],
    price: 10,
    picture: '',
    category: '',
  };
  ingredient: String;
  error: any;
  viewItem = {
    name: '',
    description: '',
    price: '',
    picture: '',
    ingredients: []
  };
  viewItemIngredients = [];
  newCategoryName: String;
  visibility: Object;

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
          this.visible[this.menu['name']] = {hide: true};
          this.visible['newItem'] = {hide: true};
          this.visible['viewItem'] = {hide: true};
        }
      })
  }

  toggleCategoryView(category){
    switch(this.visible[category].hide){
      case true: this.visible[category].hide = false; break;
      case false: this.visible[category].hide = true; break;
    }
  }
  
  showModal(element, category, item) {
    const modal = document.getElementById(element);

    const span = modal.children[0].children[0];
    

    if(category !== null){
      this.newItem['category'] = category;
      this.newItem['name'] ='';
      this.newItem['description'] = '';
      this.newItem['ingredients'] = [];
      this.newItem['price'] = 10,
      this.newItem['picture'] = '';
      this.visible['newItem'].hide = false;
    }

    if(category === null && item){
      this.viewItem = item;
      this.visible['viewItem'].hide = false;
    }

    this.hideModal = () => {
      this.visible['viewItem'].hide = true;
      this.visible['newItem'].hide = true;
    }
    
    window.onclick = (event) => {
      console.log('event target: ', event.target);
      console.log('modal: ', modal);
      
      if (event.target == modal) {
        console.log('werking')
        // modal.style.display = 'none';
        this.visible['viewItem'].hide = true;
        this.visible['newItem'].hide = true;
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

  modifyItem(){
    const pushNewIng = this.viewItem['ingredients'].push(...this.viewItemIngredients);

    
    // Promise.all(pushNewIng)
    //   .then(() => {
        this.menuServ.modifyMenuItem(this.viewItem)
          .subscribe(
            () => {
              this.getMenu(false);
              this.hideModal();
              this.viewItemIngredients = [];
            }
          )
    console.log(this.viewItem)
    // })
  };

  addViewItemIngredient(){
    this.viewItemIngredients.push(this.ingredient);
    this.ingredient = '';
  };

  removeViewItemIngredient(ing){
    const ingredientsIndex = this.viewItemIngredients.indexOf(ing);
    const viewItemIndex = this.viewItem['ingredients'].indexOf(ing);
    if(ingredientsIndex>-1){
      this.viewItemIngredients.splice(ingredientsIndex, 1);
    } else if (viewItemIndex > -1){
      this.viewItem['ingredients'].splice(viewItemIndex, 1);
    };
  };

  removeItem(){
    this.menuServ.removeMenuItem(this.viewItem['_id'])
      .subscribe(
        () => {
          this.getMenu(false);
          this.hideModal();
          this.viewItemIngredients = [];
        }
      );
  };

  newCategory(category){
    this.menuServ.newCategory(this.menuId, category)
      .subscribe(
        category => {
          this.getMenu(false);
          this['newCategoryName'] = ''
          console.log(category)
          const categoryName = category.category
          this.visible[categoryName].hide = true;
        }
      );
  };

  removeCategory(category){
    this.menuServ.removeCategory(this.menuId, category)
      .subscribe(
        menu => {
          this.menu = menu;
        }
      );
  };

  removeMenu(){
    this.deleteMenu.emit({menuId: this.menuId})
  }

}
