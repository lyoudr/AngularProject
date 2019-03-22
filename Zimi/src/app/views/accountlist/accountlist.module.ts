import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { AccountlistComponent } from './accountlist.component';
import { AccountinfoComponent } from './accountinfo/accountinfo.component';
import { AccountlistRoutingModule } from './accountlist-routing.module';
import { AccounttransectionComponent } from './accounttransection/accounttransection.component';

@NgModule({
  imports: [
    AccountlistRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule
  ],
  declarations: [ 
    AccountlistComponent,
    AccountinfoComponent,
    AccounttransectionComponent
  ]
})
export class AccountlistModule { }
