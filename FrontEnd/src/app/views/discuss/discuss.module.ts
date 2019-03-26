import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussComponent } from './discuss.component';
import { DiscussRoutingModule } from './discuss-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ClassicComponent } from './classic/classic.component'; 
import { MordernComponent } from './mordern/mordern.component';
import { RockComponent } from './rock/rock.component';
import { NewjazzComponent } from './newjazz/newjazz.component';

@NgModule({
  declarations: [
    DiscussComponent,
    ClassicComponent,
    MordernComponent,
    RockComponent,
    NewjazzComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    DiscussRoutingModule
  ]
})
export class DiscussModule { }
