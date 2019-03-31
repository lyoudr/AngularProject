import { Component, OnInit } from '@angular/core';
import { StoresearchService } from '../../services/storesearch.service';
@Component({
  selector: 'app-storemanage',
  templateUrl: './storemanage.component.html',
  styleUrls: ['./storemanage.component.scss']
})
export class StoremanageComponent implements OnInit {
  pagenumber: number;
  prevstoreinfo: any;
  storeinformation: any;
  stores: any;
  constructor(
    private storeService : StoresearchService
  ) { }

  ngOnInit() {
    this.Getstores(1);
  }
  /* Search stores */
  search(term: string): void {
    console.log('term is =>', term);
    this.storeService.searchStores()
      .subscribe((stores) => {
        console.log('回覆的 stores 是 =>', stores);
        this.stores = stores;
        let founded = this.stores.filter(searchname);
        function searchname(value){
          return  value.name == term || value.taxId == term ;
        }
        console.log('founded is =>', founded);
        this.storeinformation = founded;
      })
  }

  /* Delete search */
  delete(searchBox: HTMLInputElement){
    this.Getstores(1);
    searchBox.value = "";
  }
  Getstores(number){
    this.pagenumber = number;
    this.storeService.Getstores(this.pagenumber)
      .subscribe((storeinfo) => { 
        console.log('Returned Storeinfo is =>', storeinfo);
        this.storeinformation = storeinfo;
      })
  }
  /* Pagination */
  Getstore(number){
    this.pagenumber = number;
    this.storeService.Getstores(this.pagenumber)
      .subscribe((storeinfo) => {
        console.log('Returned Userinfo is =>', storeinfo);      
        this.storeinformation = storeinfo;
      })
  }
  decrease(){
    if(this.pagenumber < 2){
      this.pagenumber = 3;
    } else {
      this.pagenumber -= 1;
    }
    this.Getstores(this.pagenumber);
  }
  increase(){
    if(this.pagenumber > 2){
      this.pagenumber = 1;
    } else {
      this.pagenumber += 1;
    }
    this.Getstores(this.pagenumber);
  }
}
