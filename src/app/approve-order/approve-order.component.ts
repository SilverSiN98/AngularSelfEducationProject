import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './../order.service'
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.css']
})
export class ApproveOrderComponent implements OnInit {

  @ViewChild(MatTable) orderDetailsTable: MatTable<any>;

  displayedColumns: string[] = ['orderNum', 'productNames', 'totalPrice'];
  ordersDatasource;

  constructor(private oService: OrderService) { }

  ngOnInit(): void {
    this.updateOrdersTable(false);
  }

  updateOrdersTable(updateRows: boolean = true){
    this.ordersDatasource = this.oService.getAllOrders();
    if (updateRows)
      this.orderDetailsTable.renderRows();
  }

}
