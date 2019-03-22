
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/accountsearch.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.scss']
})
export class AccountlistComponent implements OnInit {
  initialaccount: any;
  accounts: any;
  founded: any;
  targetaccount: [];
  pagenumber : number = 0;
  constructor(
    private searchService: SearchService,
    private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.getaccount(1);
    this.Post();
  }

  Post(){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-type': 'application/json'
      })
    }    
    console.log('已經 post');
    let JSONdata = {
      accountlist1 : 
          [
              {
                  created_time: "2018.09.21",
                  account: "A01",
                  name: "Amy",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "A02",
                  name: "Tom",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "A03",
                  name: "Bob",
                  email: "abc@gmail.com",
                  status: "正常"
              }
          ],   
      accountlist2 : 
          [
              {
                  created_time: "2018.09.21",
                  account: "B01",
                  name: "Json",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "B02",
                  name: "Jay",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "B03",
                  name: "Bruce",
                  email: "abc@gmail.com",
                  status: "正常"
              }
          ],
      accountlist3 : 
          [
              {
                  created_time: "2018.09.21",
                  account: "C01",
                  name: "Alice",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "C02",
                  name: "Joicy",
                  email: "abc@gmail.com",
                  status: "正常"
              },
              {
                  created_time: "2018.09.21",
                  account: "C03",
                  name: "Fred",
                  email: "abc@gmail.com",
                  status: "正常"
              }
          ]  
      }
    let JSONdata2 = JSON.stringify(JSONdata);
    return this.http.post('https://192.168.100.102:8081/demo/data',JSONdata2 ,httpOptions)
      .subscribe(
        data => console.log('return response is =>', data)
  )}

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log('term is =>', term);
    this.searchService.searchAccount()
      .subscribe((searchaccount) => {
        console.log('回覆的 account 是 =>', searchaccount);
        this.initialaccount = searchaccount;
        let founded = this.initialaccount.filter(searchname);
        function searchname(value){
          return  value.name == term || value.account == term ;
        }
        console.log('founded is =>', founded);
        this.accounts = founded;
      })
  }

  getaccount(number){
    this.pagenumber = number;
    this.searchService.getaccount(this.pagenumber)
      .subscribe((userinfo) => {
        console.log('Returned Userinfo is =>', userinfo);
        this.accounts = userinfo;
      })
  }
  decrease(){
    if(this.pagenumber < 2){
      this.pagenumber = 3;
    } else {
      this.pagenumber -= 1;
    }
    this.getaccount(this.pagenumber);
  }
  increase(){
    if(this.pagenumber > 2){
      this.pagenumber = 1;
    } else {
      this.pagenumber += 1;
    }
    this.getaccount(this.pagenumber);
  }
  // Delete Search
  deleteSearch(searchBox: HTMLInputElement){
    this.getaccount(1);
    searchBox.value = '';
    console.log('searchBox.value is =>',searchBox.value);
  }
}
