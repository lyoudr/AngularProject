import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussComponent } from './discuss.component';
import { DiscussRoutingModule } from './discuss-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ClassicComponent } from './classic/classic.component'; 
import { ClassicpostComponent } from './classic/classicpost/classicpost.component';
import { MordernComponent } from './mordern/mordern.component';
import { RockComponent } from './rock/rock.component';
import { NewjazzComponent } from './newjazz/newjazz.component';
import { ReactiveFormsModule } from '@angular/forms';

/* Tabs Component */
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    DiscussComponent,
    ClassicComponent,
    ClassicpostComponent,
    MordernComponent,
    RockComponent,
    NewjazzComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    DiscussRoutingModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class DiscussModule { }
