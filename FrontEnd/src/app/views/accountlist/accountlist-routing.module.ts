import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountlistComponent } from './accountlist.component';
import { AccountinfoComponent } from './accountinfo/accountinfo.component';

const routes: Routes = [
  { path: '', component: AccountlistComponent, data: { title: 'Accountlist'} },
  { path: 'detail/:id', component: AccountinfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountlistRoutingModule {}