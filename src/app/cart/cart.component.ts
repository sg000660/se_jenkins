import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  get cartItems() {
    return this.cartService.getCartItems();
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.cartItems[index].price += this.cartItems[index].price / (this.cartItems[index].quantity - 1);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.cartItems[index].price -= this.cartItems[index].price / (this.cartItems[index].quantity + 1);
    }
  }

  getTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    const totalCost = this.getTotalCost();
    if (totalCost) {
      alert(`Total Cost of Cart: ${totalCost.toFixed(2)}. Want to proceed for payment?`);
    } else {
      alert(`Cart is empty. Add something.`);
    }
  }

  remove(index: number) {
    this.cartItems[index].ingredients.splice(index, 1);
  }
}
