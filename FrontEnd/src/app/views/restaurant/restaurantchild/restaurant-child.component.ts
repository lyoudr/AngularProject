import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import _ from "lodash";

@Component({
  selector: 'app-restaurant-child',
  templateUrl: './restaurant-child.component.html',
  styleUrls: ['./restaurant-child.component.scss']
})
export class RestaurantChildComponent implements OnInit {

  @Input() type : any;
  @Input() restaurantlists: object[];
  @Output() resetEvent = new EventEmitter();
  currency: string = "TWD";

  constructor() { }

  ngOnInit() {
    this.currency = "USD";
  }

  /*1. 價格範圍 */
  CheckSize(event: any, size : any){
    console.log('Checked is =>',event);
    console.log("child's restaurant is =>", this.restaurantlists);
    console.log('Checked size is =>', size);
    if(event == true) {
      let sliceditem = [];
      this.restaurantlists.forEach(
        function(value: any, index: any){
          console.log('index is =>', index);
          let str = value.price.trim();
          let strarr = str.split("~");
          let extsmall = Number(strarr[0]);
          let extlarge = Number(strarr[1].match(/\d+/g));
          console.log('extsmall is =>', extsmall);
          console.log('extlarge is =>', extlarge);
          if(size == "low"){
            if(extsmall < 100 || extlarge > 500) {
              sliceditem.push(index);
            }
          } else if(size == "medium"){
            if(extsmall < 500 || extlarge > 1000) {
              sliceditem.push(index);
            }
          } else if(size == "high"){
            if(extsmall < 1000 || extlarge > 1500) {
              sliceditem.push(index);
            }
          }
      });
      console.log('items should be sliced =>', sliceditem);
      _.pullAt(this.restaurantlists, sliceditem);
    } else if(event == false) {
      console.log('this.type is =>', this.type);
      this.resetEvent.emit(`${this.type}`);
    }
  }

  /*2. 修改幣別 */
  ChangeCurrency(checked, currency){
    console.log('checked is =>', checked);
    console.log('currency type is =>', currency);
    if (checked = true) {
      this.currency = currency;
    } else if (checked = false) {
      this.currency = "TWD";
    }
  }
}
