import { Component, OnInit, ViewChild } from '@angular/core';
import { SubmitOrderComponent } from '../submit-order/submit-order.component'
import { ApproveOrderComponent } from '../approve-order/approve-order.component'
import { AuthApiService } from './../auth-api.service'

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private authService: AuthApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  @ViewChild(SubmitOrderComponent) submitOrderCmp: SubmitOrderComponent; 
  @ViewChild(ApproveOrderComponent) approveOrderCmp: ApproveOrderComponent; 

  updateDatasources($event){
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn)
    {
      this.submitOrderCmp.updateOrderDetailsTable();
      this.approveOrderCmp.updateOrdersTable();
    }
  }

}
