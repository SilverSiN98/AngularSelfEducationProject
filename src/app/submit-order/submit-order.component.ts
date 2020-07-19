import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './../order.service'
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  @ViewChild(MatTable) orderDetailsTable: MatTable<any>;

  displayedColumns: string[] = ['itemNum', 'productName', 'totalPrice', 'removeBtn'];
  orderDetailsDatasource;

  totalPrice: number = 0;
  totalCount: number = 0;
  productNames: string;

  constructor(private oService: OrderService) { }

  ngOnInit(): void {
    this.updateOrderDetailsTable(false);
  }

  updateOrderDetailsTable(updateRows: boolean = true){
    this.orderDetailsDatasource = this.oService.getOrderDetails();
    
    this.totalPrice = this.orderDetailsDatasource.reduce(function(prev, curr) { return prev + curr.totalPrice; }, 0);
    this.totalCount = this.orderDetailsDatasource.length;

    var names = [];
    this.orderDetailsDatasource.forEach(element => {
      names.push(element.productName);
    });
    this.productNames = names.join(', ');

    if (updateRows)
      this.orderDetailsTable.renderRows();
  }

  removeItem($event, element){
    this.oService.removeOrderDetail(element.itemNum);
    this.updateOrderDetailsTable();
  }

  createOrder($event){
    if (this.orderDetailsDatasource.length > 0){
      this.oService.addNewOrder(this.productNames, this.totalPrice);
      alert("Order successfully created!");
    }
    else{
      alert("Add at least one item in the order!");
    }

  }
}
