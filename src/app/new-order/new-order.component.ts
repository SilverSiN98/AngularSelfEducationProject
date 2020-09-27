import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from './../order.service'
import { OrderApiService } from './../order-api.service'

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

  constructor(private oService: OrderApiService) { }

  ngOnInit(): void {
    this.oService.getAvailableProducts().subscribe((data) => {
      this.products = Array.from(Object.keys(data), k => data[k]);
      console.log(this.products);
   });
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
    this.oService.addNewOrderDetail(this.selectedProductId, this.totalPrice)
    .subscribe(data => {
      if (data)
        alert("Item was added to the order!");
      else
        alert("Something went wrong...\nSee log file for more information");
    }, error => {
      alert("Something went wrong...\n" + error);
    });
  }

}
