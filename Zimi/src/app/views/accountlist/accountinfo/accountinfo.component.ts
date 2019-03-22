import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SearchService }  from '../../../services/accountsearch.service';
//import { Accountarray } from '../accountarray';

@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html'
})
export class AccountinfoComponent implements OnInit {
  accountinfo : any;
  eachaccount: any;
  accountcoin: any;
  coins: any;
  deactives: any;
  deactive: any;
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAccountInfo();
    this.getAccountcoin();
  }
  
  /* 1.營運後台取得會員資料 */
  getAccountInfo(): void {
    //不加入＋，因為此加號會把 number 轉成 string，string 的 0 被轉成 number 後，會不見
    const id = this.route.snapshot.paramMap.get('id');
    console.log('得到的 id 是 ＝>',id);
    this.searchService.getAccountInfo(id)
      .subscribe((accountinfo) => { 
        this.accountinfo = accountinfo;
        this.eachaccount = this.accountinfo.result;
        }
      );
  }
  /* 2. 營運後台取得 user all 虛擬幣餘額 */
  getAccountcoin():void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('得到的 id 是 ＝>',id);
    this.searchService.getAccountcoin(id)
      .subscribe((accountcoin) => { 
        this.coins = accountcoin;
        }
      );
  }
  /* 3. 營運後台取得 user 停權紀錄 */
  getAccountdeactive():void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('得到的 id 是 ＝>',id);
    this.searchService.getAccountdeactive(id)
      .subscribe((deactives) => { 
        this.deactives = deactives;
        this.deactive = this.deactives.result.deactive;
        }
      );
  }
  goBack(): void {
    this.location.back();
  }
}
