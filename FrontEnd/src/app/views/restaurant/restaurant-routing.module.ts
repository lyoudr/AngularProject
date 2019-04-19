import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';
import { EachrestaurantComponent } from './restaurantchild/eachrestaurant/eachrestaurant.component';

const routes: Routes = [
  { path: '', component: RestaurantComponent, data: { title: 'Restaurant'} },
  { path: 'detail/:id', component: EachrestaurantComponent, data: { title: 'Eachrestaurant'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {}