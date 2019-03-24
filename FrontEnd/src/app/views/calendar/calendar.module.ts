import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TodoItem } from './calendar.component';
import { TodoContent } from './calendar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    CalendarRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  declarations: [
    CalendarComponent,
    TodoItem,
    TodoContent
  ],
  entryComponents:[
    TodoItem,
    TodoContent
  ]
})
export class CalendarModule { }
