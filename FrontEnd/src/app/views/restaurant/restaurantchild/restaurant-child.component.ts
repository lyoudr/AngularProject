import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-child',
  templateUrl: './restaurant-child.component.html',
  styleUrls: ['./restaurant-child.component.scss']
})
export class RestaurantChildComponent implements OnInit {

  @Input() restaurantlists: any;

  constructor() { }

  ngOnInit() {
  }

  Checkedlow(event: any){
    console.log('Checkedlow is =>',event);
    console.log("child's restaurant is =>", this.restaurantlists);
    let newrestaurantlists = this.restaurantlists.find(function(value: any){
      let str = value.price.trim();
      let strarr = str.split("~");
      let extsmall = Number(strarr[0]);
      let extlarge = Number(strarr[1].match(/\d+/g));
      console.log('extsmall is =>', extsmall);
      console.log('extlarge is =>', extlarge);
      if(extsmall >= 100 && extlarge <= 500) {
        return value
      }
    });
    console.log('newrestaurantlists is =>', newrestaurantlists);
    if(newrestaurantlists == undefined){
      this.restaurantlists = [];
    } else {
      this.restaurantlists = newrestaurantlists;
    }
  }

  Checkedmedium(event: any){
    console.log('Checkedmedium is =>',event);
    console.log("child's restaurant is =>", this.restaurantlists);
    if(event == true) {
      this.restaurantlists.forEach(function(value: any, index: number, object: any){
        let str = value.price.trim();
        let strarr = str.split("~");
        let extsmall = Number(strarr[0]);
        let extlarge = Number(strarr[1].match(/\d+/g));
        console.log('extsmall is =>', extsmall);
        console.log('extlarge is =>', extlarge);
        if(extsmall < 500 || extlarge > 1000) {
          object.splice(index, 1);
        }
      });
      console.log('找到的項目是 =>', this.restaurantlists);
    } else if (event == false) {

    }
    /*if(newrestaurantlists == undefined){
      this.restaurantlists = [];
    } else {
      this.restaurantlists = newrestaurantlists;
    }*/
  }

  Checkedhigh(event: any){
    console.log('Checkedhigh is =>',event);
    console.log("child's restaurant is =>", this.restaurantlists);
    let newrestaurantlists = this.restaurantlists.find(function(value: any){
      let str = value.price.trim();
      let strarr = str.split("~");
      let extsmall = Number(strarr[0]);
      let extlarge = Number(strarr[1].match(/\d+/g));
      console.log('extsmall is =>', extsmall);
      console.log('extlarge is =>', extlarge);
      if(extsmall >= 1000 && extlarge <= 1500) {
        return value
      }
    });
    console.log('newrestaurantlists is =>', newrestaurantlists);
    if(newrestaurantlists == undefined){
      this.restaurantlists = [];
    } else {
      this.restaurantlists = newrestaurantlists;
    }
  }
}
