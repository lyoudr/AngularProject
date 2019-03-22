import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { StoremanageRoutingModule } from './storemanage-routing.module';
import { StoremanageComponent } from './storemanage.component';
import { AddstoreComponent } from './addstore/addstore.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreinfoComponent } from './storeinfo/storeinfo.component';

@NgModule({
  imports: [
    StoremanageRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    StoremanageComponent, 
    AddstoreComponent, 
    StoreinfoComponent
  ]
})
export class StoremanageModule { }
