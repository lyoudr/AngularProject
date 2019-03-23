import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CastExpr } from '@angular/compiler';
  
/* CalendarComponent */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  /* Variables */
  Year: any;
  Month:string;
  datespermonth: number ;
  datesarray : any = [];
  initialmonth : any;
  currentmonth: any;
  substractyear: number = 0;
  parenttodolists: any = [{}];
  weekday: any;

  constructor(public dialog: MatDialog) { }
  
  ngOnInit() {
    this.GetNow();
  }

  GetNow(){
    var currenttime = new Date();
    /*設定年份*/
    this.Year = currenttime.getFullYear();
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = currenttime.getMonth();
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    }
    /*設定目前時間*/
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    for(var j = 0; j < (currenttime.getDay()); j++){
      let eachtimeresult = { date: '', data: [] }
      this.datesarray.push(eachtimeresult);
    }
    for (var i = 1; i < this.datespermonth; i ++){
      var current = new Date();
      current.setDate(i);
      current.getDay();
      this.datesarray.push({date: current.getDate(), data: [] });             
    }
  }

  Prev(){
    this.datesarray = [];
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = this.initialmonth - 1;
      /* 根據月份判斷年份 */
    if (this.initialmonth < 0) {
      this.initialmonth = 11;
      this.Year = this.Year - 1;
    } 
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    }
    this.GenerateDate();
  }

  Next(){
    this.datesarray = [];
    /*設定月份*/
    var month = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
    this.initialmonth = this.initialmonth + 1;
    /* 根據月份判斷年份 */
    if (this.initialmonth > 11) {
      this.initialmonth = 0;
      this.Year = this.Year + 1;
    } 
    var Month = month[this.initialmonth];
    this.Month = Month;
    /*判斷此月份的天數*/
    if(((this.initialmonth + 1) % 2) != 0){
      if((this.initialmonth + 1) < 9){
        this.datespermonth = 32;
      } else {
        this.datespermonth = 31;
      }
    } else {
      if ((this.initialmonth + 1) == 2) {
        //閏年判斷
        if(this.Year % 4 != 0){
          this.datespermonth = 29
        } else if (this.Year % 4 == 0 && this.Year % 100 != 0) {
          this.datespermonth = 30
        } else if (this.Year % 100 == 0 && this.Year % 400 != 0) {
          this.datespermonth = 29
        } else if (this.Year % 400 == 0) {
          this.datespermonth = 30
        }
      } else {
        if((this.initialmonth + 1) < 8){
          this.datespermonth = 31
        } else if ((this.initialmonth + 1) >= 8) {
          this.datespermonth = 32
        }
      }
    } 
    this.GenerateDate();
  }

  GenerateDate(){
    var currenttime = new Date();
    currenttime.setFullYear(this.Year);
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    for(var j = 0; j < (currenttime.getDay()); j++){
      let eachtimeresult = { date: '', data: [] }
      this.datesarray.push(eachtimeresult);
    }
    for (var i = 1; i < this.datespermonth; i ++){
      currenttime.setDate(i);
      currenttime.getDay();
      this.datesarray.push({date: currenttime.getDate(), data: []});             
    }
  }

  /* 增加記事 */
  OpenModal(date:any):void{
    console.log('被點的日期是 =>', date);
    let currenttime = new Date();
    currenttime.setFullYear(this.Year);
    currenttime.setMonth(this.initialmonth);
    currenttime.setDate(1);
    let dateindex = (currenttime.getDay() + date);
    console.log('dateindex is =>', dateindex);
    
    const dialogRef = this.dialog.open(TodoItem, {
      width: '300px',
      data: {todolists: this.parenttodolists}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed. Dialog result is =>${result}`);
      this.datesarray[(dateindex-1)] = { date: date, data: result };
    });
  }
}

export interface DialogData {
  todoitem: string;
}

/* TodoItem Dialog Component */
@Component({
  selector: 'app-todoItem',
  templateUrl: 'todoItem.html',
})

export class TodoItem {
  todolists: any = [];

  constructor(
    public dialogRef: MatDialogRef<TodoItem>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(todo:any): void {
    console.log('新增的項目是 =>',typeof todo);
    if(!todo){ return; }
    this.todolists.push(todo);
    console.log('this.todolist is =>', this.todolists);
  }
}