import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDataComponent } from './big-data.component';
import { CdkVirtualScrollDataSourceExample } from './CdkVirtualScroll.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { BigDataRoutingModule } from './big-data-routing.module';

@NgModule({
  declarations: [
    BigDataComponent,
    CdkVirtualScrollDataSourceExample
  ],
  imports: [
    CommonModule,
    ScrollDispatchModule,
    BigDataRoutingModule
  ]
})
export class BigDataModule { }
