import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDataComponent } from './big-data.component';
import { CdkVirtualScrollDataSourceExample } from './cdk_virtual_scroll/CdkVirtualScroll.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { BigDataRoutingModule } from './big-data-routing.module';
import { ChatComponent } from './chat_dynamic/chat.component';
import { AdDirective } from './chat_dynamic/ad.directive';
import { AdService } from './chat_dynamic/ad.service';

@NgModule({
  declarations: [
    BigDataComponent,
    CdkVirtualScrollDataSourceExample,
    ChatComponent,
    AdDirective
  ],
  imports: [
    CommonModule,
    ScrollDispatchModule,
    BigDataRoutingModule
  ],
  providers: [
    AdService
  ],
  entryComponents: [
    ChatComponent
  ]
})
export class BigDataModule { }
