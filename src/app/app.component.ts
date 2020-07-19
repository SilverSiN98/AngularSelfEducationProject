import { Component, ViewChild } from '@angular/core';
import { SubmitOrderComponent } from './submit-order/submit-order.component'
import { ApproveOrderComponent } from './approve-order/approve-order.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SelfEducationProject';

  @ViewChild(SubmitOrderComponent) submitOrderCmp: SubmitOrderComponent; 
  @ViewChild(ApproveOrderComponent) approveOrderCmp: ApproveOrderComponent; 

  updateDatasources($event){
    this.submitOrderCmp.updateOrderDetailsTable();
    this.approveOrderCmp.updateOrdersTable();
  }
}
