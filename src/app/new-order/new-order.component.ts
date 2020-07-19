import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from './../order.service'

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  numFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ]);

  selectedProductId: number = 0;
  selectedProduct: string;
  selectedPrice: number = 0;
  discountAmount: number = 0;
  totalPrice: number = this.selectedPrice - this.discountAmount;

  products;

  constructor(private oService: OrderService) { }

  ngOnInit(): void {
    this.products = this.oService.getAvailableProducts();
  }

  recalculateTotalPrice($event){
    if (this.selectedProductId != 0)
    {
      this.selectedProduct = this.products.find(x => x.id == this.selectedProductId).name;
      this.selectedPrice = this.products.find(x => x.id == this.selectedProductId).price;
    }

    if (this.selectedPrice - this.discountAmount <= 0)
    {
      this.totalPrice = this.selectedPrice;
      this.discountAmount = 0;
      alert("Total price cannot be less than 0!");
    }
    else
      this.totalPrice = this.selectedPrice - this.discountAmount;
  }

  addNewItem($event){
    this.oService.addNewOrderDetail(this.selectedProduct, this.totalPrice);
    alert("Item was added to the order!");
  }

}
