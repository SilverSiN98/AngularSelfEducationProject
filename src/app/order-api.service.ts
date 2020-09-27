import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OrderDetail } from 'src/app/classes/orderDetail'
import { Order } from 'src/app/classes/order'

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  private apiUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  getAvailableProducts(){
    return this.http.get(this.apiUrl + "products");
  }

  addNewOrderDetail(productId: number, price: number){

    let data = new OrderDetail();
    data.ProductID = productId;
    data.TotalPrice = price;

    return this.http.post(this.apiUrl + "orderDetails", data);
  }

  removeOrderDetail(id: number){
    return this.http.delete(this.apiUrl + "orderDetails/" + id);
  }

  getOrderDetails(){
    return this.http.get(this.apiUrl + "orderDetails");
  }

  addNewOrder(){
    let data = new Order();
    return this.http.post(this.apiUrl + "orders", data);
  }

  getAllOrders(){
    return this.http.get(this.apiUrl + "orders");
  }
}
