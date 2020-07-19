import { Injectable } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderDetail {
  itemNum: number;
  productName: string;
  totalPrice: number;
}

interface Order {
  orderNum: number;
  productNames: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  availableProducts: Product[] = [
    {id: 1, name: 'Tea', price: 80},
    {id: 2, name: 'Bread', price: 12},
    {id: 3, name: 'Meat', price: 135},
    {id: 4, name: 'Fish', price: 105},
    {id: 5, name: 'Potatoes', price: 15},
    {id: 6, name: 'Onion', price: 25},
    {id: 7, name: 'Cheese', price: 150},
    {id: 8, name: 'Milk', price: 23},
    {id: 9, name: 'Eggs', price: 35}
  ];

  currOrderDetails: OrderDetail[] = [];
  orderDetailIdCounter: number = 1;

  currOrders: Order[] = [];
  orderIdCounter: number = 1;

  constructor() { }

  getAvailableProducts(){
    return this.availableProducts;
  }

  addNewOrderDetail(productName: string, totalPrice: number){
    var newOrderDetail = <OrderDetail>{};
    newOrderDetail.itemNum = this.orderDetailIdCounter;
    newOrderDetail.productName = productName;
    newOrderDetail.totalPrice = totalPrice;

    this.currOrderDetails.push(newOrderDetail);
    this.orderDetailIdCounter++;
  }

  removeOrderDetail(id: number){
    this.currOrderDetails = this.currOrderDetails.filter(item => item.itemNum !== id);
  }

  getOrderDetails(){
    return this.currOrderDetails;
  }

  addNewOrder(names: string, totalPrice: number){
    var newOrder = <Order>{};
    newOrder.orderNum = this.orderIdCounter;
    newOrder.productNames = names;
    newOrder.totalPrice = totalPrice;

    this.currOrders.push(newOrder);
    this.orderIdCounter++;
  }

  getAllOrders(){
    return this.currOrders;
  }
}
