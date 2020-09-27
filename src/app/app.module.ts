import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { OrderService } from './order.service'
import { OrderApiService } from './order-api.service'
import { AuthApiService } from './auth-api.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderHomeComponent } from './order-home/order-home.component';
import { AuthComponent } from './auth/auth.component'
import { ApiInterceptor } from './api-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    NewOrderComponent,
    SubmitOrderComponent,
    ApproveOrderComponent,
    OrderHomeComponent,
    AuthComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OrderService,
    OrderApiService,
    AuthApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
