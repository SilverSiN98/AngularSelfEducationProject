import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './../order.service'
import { OrderApiService } from './../order-api.service'
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.css']
})
export class ApproveOrderComponent implements OnInit {

  @ViewChild(MatTable) orderDetailsTable: MatTable<any>;

  displayedColumns: string[] = ['orderNum', 'productNames', 'totalPrice'];
  ordersDatasource: any[] = [];

  constructor(private oService: OrderApiService) { }

  ngOnInit(): void {
    this.updateOrdersTable(false);
  }

  updateOrdersTable(updateRows: boolean = true){
    this.oService.getAllOrders().subscribe((data) => {
      this.ordersDatasource = Array.from(Object.keys(data), k => data[k]);
      if (updateRows)
        this.orderDetailsTable.renderRows();
   });
  }

}
