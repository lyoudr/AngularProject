import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscussComponent } from './discuss.component';
import { ClassicComponent } from './classic/classic.component';
import { MordernComponent } from './mordern/mordern.component';
import { RockComponent } from './rock/rock.component';
import { NewjazzComponent } from './newjazz/newjazz.component';

const routes: Routes = [
  { path: '', component: DiscussComponent, data: { title: 'Discuss'} },
  { path: 'classic', component: ClassicComponent, data: { title: 'classic' } },
  { path: 'mordern', component: MordernComponent, data: { title: 'mordern' } },
  { path: 'rock', component: RockComponent, data: { title: 'rock' } },
  { path: 'newjazz', component: NewjazzComponent, data: { title: 'newjazz' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscussRoutingModule {}