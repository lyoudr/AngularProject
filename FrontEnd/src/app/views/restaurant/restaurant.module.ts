import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantChildComponent } from './restaurantchild/restaurant-child.component';
import { TabsModule } from 'ngx-bootstrap/tabs'; 
import { MatTabsModule } from '@angular/material/tabs';
import { HighlightDirective } from '../../directives/highlight.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ChangecurrencyPipe } from '../../pipes/changecurrency.pipe';
import { EachrestaurantComponent } from '../restaurant/restaurantchild/eachrestaurant/eachrestaurant.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material'
import { DialogComponent } from './restaurantchild/eachrestaurant/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollDataSourceExample } from './restaurantchild/eachrestaurant/CdkVirtualScroll.component';

@NgModule({
  imports: [
    RestaurantRoutingModule,
    TabsModule,
    CommonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    FlexLayoutModule,
    HttpClientModule,
    ScrollDispatchModule
  ],
  declarations: [ 
    RestaurantComponent,
    RestaurantChildComponent,
    DialogComponent,
    HighlightDirective,
    ChangecurrencyPipe,
    EachrestaurantComponent,
    CdkVirtualScrollDataSourceExample
  ],
  entryComponents: [ DialogComponent ]
})
export class RestaurantModule { }