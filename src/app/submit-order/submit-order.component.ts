import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './../order.service'
import { OrderApiService } from './../order-api.service'
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit {

  @ViewChild(MatTable) orderDetailsTable: MatTable<any>;

  displayedColumns: string[] = ['itemNum', 'productName', 'totalPrice', 'removeBtn'];
  orderDetailsDatasource: any[] = [];

  totalPrice: number = 0;
  totalCount: number = 0;
  productNames: string;

  constructor(private oService: OrderApiService) { }

  ngOnInit(): void {
    this.updateOrderDetailsTable(false);
  }

  updateOrderDetailsTable(updateRows: boolean = true){
    this.oService.getOrderDetails().subscribe((data) => {
      this.orderDetailsDatasource = Array.from(Object.keys(data), k => data[k]);
      this.totalPrice = this.orderDetailsDatasource.reduce(function(prev, curr) { return prev + curr.totalPrice; }, 0);
      this.totalCount = this.orderDetailsDatasource.length;

      var names = [];
      this.orderDetailsDatasource.forEach(element => {
        names.push(element.productName);
      });
      this.productNames = names.join(', ');

      if (updateRows)
        this.orderDetailsTable.renderRows();
   });
  }

  removeItem($event, element){
    this.oService.removeOrderDetail(element.itemNum).subscribe(data => {
      if (data)
        this.updateOrderDetailsTable();
      else
        alert("Something went wrong...\nSee log file for more information");
    }, error => {
      alert("Something went wrong...\n" + error);
    });
    
  }

  createOrder($event){
    if (this.orderDetailsDatasource.length > 0){
      this.oService.addNewOrder().subscribe(data => {
        if (data)
        {
          this.updateOrderDetailsTable();
          alert("Order successfully created!");
        }
        else
          alert("Something went wrong...\nSee log file for more information");
      }, error => {
        alert("Something went wrong...\n" + error);
      });
    }
    else{
      alert("Add at least one item in the order!");
    }

  }
}
