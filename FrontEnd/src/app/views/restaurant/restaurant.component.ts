import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurantlists: any;
  pagenumber : number;
  classification : string;
  tabIndex : number;
  checkedlow :boolean = false;
  checkedmedium :boolean = false;
  checkedhigh :boolean = false;

  constructor(
    private restaurantService : RestaurantService
  ) { }

  ngOnInit() {
    this.Sweet(1, "sweet");
  }

  /*1. Get restaurant lists */
  Sweet(pagenumber, classification : string){
    this.pagenumber = pagenumber;
    this.classification = classification;
    console.log('classification =>', this.classification);
    this.restaurantService.Getrestaurant(this.pagenumber, this.classification)
      .subscribe((restaurantlists)=>{
        console.log('回傳的餐廳清單 =>', restaurantlists);
        this.restaurantlists = restaurantlists;
      })
  }

  Righteous(pagenumber, classification : string){
    this.pagenumber = pagenumber;
    this.classification = classification;
    console.log('classification =>', this.classification);
    this.restaurantService.Getrestaurant(this.pagenumber, this.classification)
      .subscribe((restaurantlists)=>{
        console.log('回傳的餐廳清單 =>', restaurantlists);
        this.restaurantlists = restaurantlists;
      })
  }

  Chinese(pagenumber, classification : string){
    this.pagenumber = pagenumber;
    this.classification = classification;
    console.log('classification =>', this.classification);
    this.restaurantService.Getrestaurant(this.pagenumber, this.classification)
      .subscribe((restaurantlists)=>{
        console.log('回傳的餐廳清單 =>', restaurantlists);
        this.restaurantlists = restaurantlists;
      })
  }

  tabFocusChange($event: MatTabChangeEvent) {
    console.log(`focus變更，indx：${$event.index}`);
    this.tabIndex = $event.index;
    if (this.tabIndex == 0) {
      this.Sweet(1, "sweet");
    } else if (this.tabIndex == 1){
      this.Righteous(1, "righteous");
    } else if (this.tabIndex == 2){
      this.Chinese(1, "chinese");
    }
  }

}
