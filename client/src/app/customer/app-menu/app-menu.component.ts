import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  @Input() order: any;
  @Input() restaurantId: any;
  menus: Array<Object>;
  // All the menu items of the menu
  menuItems: Array<Object> = [];
  // Current item viewing
  viewItem: Object = {
    ingredients: [],
  };
  // Order to be placed
  placeOrder: Array<Object>;
  // Comments about the item being added to placeOrder
  comments: String;
  // Quantity of particular item being added to placeOrder
  quantity: Number = 1;
  currentCategory: String;
  visible: Object = {
    itemModal: {},
  };
  restaurantName: String;
  currentMenu: String;

  constructor(
    private restaurant: RestaurantService,
    private menu: MenuService
  ) { }

  ngOnInit() {
    this.restaurant.getRestaurant(this.restaurantId)
      .subscribe(
        restaurant => {
          this.restaurantName = restaurant['name']
        }
      )
    
    
    this.menu.getMenus(this.restaurantId)
      .subscribe(
        menus => {
          console.log(menus[0].subMenus[0].items[0])
          this.menus = menus

          menus.forEach((e, i) => {
            this.menu.getMenuItems(e._id).subscribe(
              menuItems => {
                menuItems.forEach(item => {
                  this.menuItems.push(item);
                })
              }
            )
            if(i === 0){
              this.currentCategory = e['subMenus'][0]['category'];
                this.currentMenu = e['name'];
            }
            
          })
          this.visible['itemModal'] = { hide: true };

        },
        err => {
          console.error(err)
        }
      )

      console.log('currentMenu', this.currentMenu);
      console.log('currentCategory', this.currentCategory);
      console.log('this.visible: ', this.visible);
    
  }

  hideModal;

  showModal(element) {
    const modal = document.getElementById(element);
    // console.log(element)
    // console.log(modal)
    const span = modal.children[0].children[0];

    modal.style.display = "block";

    // console.log(this.menuItems)
    // console.log(element)

    // Finds item user is viewing from menuItems 
      // and makes that item equal to the active item 
    this.viewItem = this.menuItems.filter(e => e['_id'] === element.split('-')[0])[0]
    this.viewItem['modifications'] = [];
    // console.log(this.viewItem)    

    window.onclick = (event) => {
      if (event.target == modal) {
        console.log('werd')
        modal.style.display = 'none';
        this.viewItem = {ingredients: []};
        this.quantity = 1;
        this.comments = null;
      }
    }

    this.hideModal = () => {
      console.log('werk');
      console.log('modal.style: ', modal.style)
      modal.style.display = 'none';
      console.log('modal after: ', modal)
      console.log('modal.style: ', modal.style)

      this.viewItem = {ingredients: []};
      this.quantity = 1;
      this.comments = null;    
    }

  }

  showCommentForm(commentsId, event){
    const commentForm = document.getElementById(commentsId);
    console.log(event.target);
    event.target.style.display = 'none';

    commentForm.style.display = 'block';
  }

  removeIngredient(ingredient){
    const index = this.viewItem['ingredients'].indexOf(ingredient);
    this.viewItem['ingredients'].splice(index, 1);
    const modification = `No ${ingredient}`;

    this.viewItem['modifications'].push(modification);
  }

  addIngredient(ingredient){
    this.viewItem['ingredients'].push(ingredient);

    const modification = `No ${ingredient}`;
    this.viewItem['modifications'].splice(this.viewItem['modifications'].indexOf(modification), 1)    
  }

  addItemToOrder(){
    // Creates the new item which is what will be on the order
    
    // Couldn't destructure because of a compiling error
    // const {name, price, ingredients, modifications } = this.viewItem;
    
    let item = {};


    item['name'] = this.viewItem['name'];
    item['price'] = this.viewItem['price'];
    item['ingredients'] = this.viewItem['ingredients'];
    item['modifications'] = this.viewItem['modifications'];
    item['category'] = this.viewItem['category'];

    item['quantity'] = this.quantity;
    item['itemId'] = this.viewItem['_id'];
    item['status'] = 'open';
    item['comments'] = this.comments;

    // Want to add functionality to not add item to order if item only exists
      // and instead add it to the item's quantity
    if (this.placeOrder === undefined){
      this.placeOrder = [];
    }
    this.placeOrder.push(item)
    console.log(this.placeOrder);
    this.hideModal()
  }

  executeOrder(){
    this.placeOrder = [];
  }

  toggleCategory(category){
    this.currentCategory = category
  }

  toggleMenu(){
    const menus = this.menus.map(e => e['name'])
    const index = menus.indexOf(this.currentMenu);
    if(index === menus.length-1){
      this.currentMenu = menus[0];
    } else {
      this.currentMenu = menus[index+1];
    }
  }

}
