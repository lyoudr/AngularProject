import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';

const routes: Routes = [
  { path: '', component: RestaurantComponent, data: { title: 'Restaurant'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {}