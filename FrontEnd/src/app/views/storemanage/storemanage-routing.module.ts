import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoremanageComponent } from './storemanage.component';
import { AddstoreComponent } from './addstore/addstore.component';
import { StoreinfoComponent } from './storeinfo/storeinfo.component';
const routes: Routes = [
  { path: '', component: StoremanageComponent, data: { title: 'storemanage'} },
  { path: 'addstore', component: AddstoreComponent, data : { title: 'addstore '} },
  { path: 'detail/:id', component: StoreinfoComponent, data : { title: 'storeinfo'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoremanageRoutingModule {}