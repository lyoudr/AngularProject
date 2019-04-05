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

@NgModule({
  imports: [
    RestaurantRoutingModule,
    TabsModule,
    CommonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule
  ],
  declarations: [ 
    RestaurantComponent,
    RestaurantChildComponent,
    HighlightDirective
  ]
})
export class RestaurantModule { }