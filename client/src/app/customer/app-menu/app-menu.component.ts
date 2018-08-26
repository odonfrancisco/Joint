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
  item: Object;
  // Order to be placed
  placeOrder: Array<Object>;
  // Comments about the item being added to placeOrder
  comments: String;
  // Quantity of particular item being added to placeOrder
  quantity: Number = 1;

  constructor(
    private restaurant: RestaurantService,
    private menu: MenuService
  ) { }

  ngOnInit() {
    this.menu.getMenus(this.restaurantId)
      .subscribe(
        menus => {
          console.log(menus[0].subMenus[0].items[0])
          this.menus = menus

          menus.forEach(e => {
            this.menu.getMenuItems(e._id).subscribe(
              menuItems => {
                menuItems.forEach(item => {
                  this.menuItems.push(item);
                })
              }
            )
          })

        },
        err => {
          console.error(err)
        }
      )
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
    this.item = this.menuItems.filter(e => e['_id'] === element.split('-')[0])[0]
    this.item['modifications'] = [];
    // console.log(this.item)

    span.addEventListener('click', () => {
      modal.style.display = 'none';
      this.item = null;
      this.quantity = 1;
      this.comments = null;
    })

    this.hideModal = () => {
      modal.style.display = 'none';
      this.item = null;
      this.quantity = 1;
      this.comments = null;    
    }
    

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
        this.item = null;
        this.quantity = 1;
        this.comments = null;
      }
    }
  }

  showCommentForm(commentsId, event){
    const commentForm = document.getElementById(commentsId);
    console.log(event.target);
    event.target.style.display = 'none';

    commentForm.style.display = 'block';
  }

  removeIngredient(ingredient){
    const index = this.item['ingredients'].indexOf(ingredient);
    this.item['ingredients'].splice(index, 1);
    const modification = `No ${ingredient}`;

    this.item['modifications'].push(modification);
  }

  addItemToOrder(commentsId){
    // Creates the new item which is what will be on the order
    const {name, price, ingredients, modifications } = this.item;
    const item = {
      name, price, ingredients, modifications
    };

    item['quantity'] = this.quantity;
    item['itemId'] = this.item['_id'];
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

}
