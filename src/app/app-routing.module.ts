import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHomeComponent } from './order-home/order-home.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  { path: "order", component: OrderHomeComponent }, 
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const 
RoutingComponent = [OrderHomeComponent, AuthComponent];
