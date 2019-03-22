import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoresearchService } from '../../../services/storesearch.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-storeinfo',
  templateUrl: './storeinfo.component.html',
  styleUrls: ['./storeinfo.component.scss']
})

export class StoreinfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private storeService: StoresearchService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.GetStores();
  }

  GetStores(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.storeService.Geteachstore(id)
      /*.subscribe((eachstore) => {
        this.eachstore = eachstore
      })*/
  }
  originalname = "Amy";
  profileForm = this.fb.group({
    storeinformation: this.fb.group({
      storename: ['', [Validators.required, Validators.maxLength(10)]],
      storeclass: ['',[Validators.required]],
      companycountry: ['',[Validators.required]],
      country: ['',[Validators.required]],
      city: ['',[Validators.required]],
      area: ['',[Validators.required]],
      address: ['',[Validators.required]],
      companyphone: ['',[Validators.required]],
      internetsite: ['',[Validators.required]]
    }),
    personinchargeinfo: this.fb.group({
      principal: ['',[Validators.required]],
      chargeselectcountry : [''],
      identity: ['', [/*IdCardNumberCheck*/]],
      passportnumber: ['']
    }),
    contactinfo: this.fb.group({
      contactperson: ['',[Validators.required]],
      contactphone: ['',[Validators.required, /*Validators.pattern('^(0)(9)([0-9]{8})$')*/]],
      email: ['',[Validators.required, Validators.email]]
    }),
    storesetup: this.fb.group({
      discount:['',[Validators.required, Validators.min(0), Validators.max(100)]],
      handlingfee:['',[Validators.required]],
      currencyclass:['',[Validators.required]]
    }),
    businesssetup: this.fb.group({
      business: ['',[Validators.required]]
    })
  });
  /* 選擇資料 */
  /* 1. 店家資料 */
    //1.2 店家分類
    storeclasses = [
      { each: "美食", index : 1 },{ each: "購物", index : 2 },{ each: "育樂", index : 3 },{ each: "超市", index : 4 },{ each: "其他", index: 5 } 
    ]
    //1.4 公司註冊國籍
    companycountries = [
      { each: "台灣", index : 1 }
    ]
    //1.5 公司地址
    countries = [
      { each : "台灣", index: 1}
    ]
    cities = [
      {each: "台北市", index: 1},
      {each: "新北市", index: 2},
      {each: "桃園市", index: 3},
      {each: "台中市", index: 4},
      {each: "台南市", index: 5},
      {each: "高雄市", index: 6},
      {each: "基隆市", index: 7},
      {each: "新竹市", index: 8},
      {each: "嘉義市", index: 9},
      {each: "新竹縣", index: 10},
      {each: "苗栗縣", index: 11},
      {each: "彰化縣", index: 12},
      {each: "南投縣", index: 13},
      {each: "雲林縣", index: 14},
      {each: "嘉義縣", index: 15},
      {each: "屏東縣", index: 16},
      {each: "宜蘭縣", index: 17},
      {each: "花蓮縣", index: 18},
      {each: "台東縣", index: 19},
      {each: "澎湖縣", index: 20},
      {each: "金門縣", index: 21},
      {each: "連江縣", index: 22},
    ]
    
    area = [
      [
        { each : "中正區" , index : 1 }, { each : "大同區" , index : 2 }, { each : "中山區" , index : 3 }, { each : "松山區" , index : 4 }, { each : "大安區" , index : 5 }, { each : "萬華區" , index : 6 }, { each : "信義區" , index : 7 }, { each : "士林區" , index : 8 }, { each : "北投區" , index : 9 }, { each : "內湖區" , index : 10 }, { each : "南港區" , index : 11 },{ each : "文山區" , index : 12 }
      ],
      [
        { each: "板橋區", index: 1 }, { each: "新莊區", index : 2 }, { each: "中和區", index : 3 }, { each: "永和區" ,index : 4 }, { each: "土城區", index : 5 },
        { each: "樹林區", index : 6 }, { each: "三峽區", index : 7 }, { each: "鶯歌區", index : 8 }, { each: "三重區", index : 9 }, { each: "蘆洲區", index: 10 },
        { each: "五股區", index : 11 }, { each: "泰山區", index : 12 }, { each: "林口區", index : 13 }, { each: "八里區", index : 14 }, { each: "淡水區", index : 15 },
        { each: "三芝區", index : 16 }, { each: "石門區", index : 17 }, { each: "金山區", index : 18 }, { each: "萬里區", index : 19 }, { each: "汐止區", index: 20 }, 
        { each: "瑞芳區", index : 21 }, { each: "貢寮區", index : 22 }, { each: "平溪區", index : 23 }, { each: "雙溪區", index : 24 }, { each: "新店區", index: 25 },
        { each: "深坑區", index : 26 }, { each: "石碇區", index : 27 }, { each: "坪林區", index : 28 }, { each: "烏來區", index : 29 }
      ]
    ]
  
  /* 2. 負責人資料 */
    //2.2 國籍
    chargeselectcountries = [
      { each: "台灣", index : 1 }
    ]
  /* 4. 商家設定 */
    //4.3 收款幣別
    currencyclasses = [
      { each: "美金", index: 1 },
      { each: "台幣", index: 2 },
      { each: "港幣", index: 3 },
      { each: "人民幣", index: 4 },
      { each: "歐元", index: 5 },
      { each: "日圓", index: 6 },
      { each: "馬來西亞令吉", index: 7 },
      { each: "印尼盾", index: 8 },
      { each: "韓圓", index: 9 },
      { each: "泰銖", index: 10 },
      { each: "越南盾", index: 11 },
      { each: "菲律賓披索", index: 12 }
    ]

  /*  Getters */
  get storename() { return this.profileForm.get('storeinformation').get('storename'); }
  get storeclass() { return this.profileForm.get('storeinformation').get('storeclass')}
  get identity() { return this.profileForm.get('personinchargeinfo').get('identity'); }
  get email() { return this.profileForm.get('contactinfo').get('email'); }
  get contactphone() { return this.profileForm.get('contactinfo').get('contactphone'); }
  get discount() { return this.profileForm.get('storesetup').get('discount'); }
  
  onSubmit(){
    console.log("目前選擇的資料是 ＝>", this.profileForm.value);
  }
}
