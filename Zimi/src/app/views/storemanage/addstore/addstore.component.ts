import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator, Validators, ValidatorFn, FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { StoresearchService } from '../../../services/storesearch.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.scss']
})
export class AddstoreComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private storeService: StoresearchService,
    private router: Router
  ) { }
  
  storeresponse: any;
  area: any;
  ngOnInit():void{
    /*1. 公司地址：得到各行政區 */
    this.profileForm.get('storeinformation').get('city').valueChanges.subscribe(
      (value) => {
        console.log('第一個選擇的鄉鎮是 ＝>', value.index)
        let selected = value.index;
        this.area = this.areaforchoose[`${selected - 1}`];
        console.log('this.area =>',this.area);
      }
    )
  }
  
  profileForm = this.fb.group({
    storeinformation: this.fb.group({
      storename: ['', [Validators.required, Validators.maxLength(10)]],
      storeclass: ['',[Validators.required]],
      taxID: ['', [Validators.required, ValidatetaxID]],
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
      identity: ['', [IdCardNumberCheck]],
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
      currencyclass:['',[Validators.required]],
      settlementType:['',[Validators.required]],
      status:['',[Validators.required]]
    }),
    businesssetup: this.fb.group({
      business: ['',[Validators.required]]
    })
  });

  onSubmit(){

    let StoreInfo = this.profileForm.get('storeinformation');
    let ChargeInfo = this.profileForm.get('personinchargeinfo');
    let ContactInfo = this.profileForm.get('contactinfo');
    let StoreSetup = this.profileForm.get('storesetup');
    let Business = this.profileForm.get('businesssetup');
    
    let storeInfo = {
      "address": StoreInfo.get('address').value,//1.5 公司地址
      "country": StoreInfo.get('country').value,//1.5 公司地址
      "city": StoreInfo.get('city').value,//1.5 公司地址
      "area": StoreInfo.get('area').value,//1.5 公司地址
      "bossId": ChargeInfo.get('identity').value,//2.3 身分證字號 (負責人)
      "bossName": ChargeInfo.get('principal').value,//2.1 姓名（負責人）
      "bossNationality": ChargeInfo.get('chargeselectcountry').value,//2.2 國籍 (負責人)
      "bossPassportId": ChargeInfo.get('passportnumber').value,//2.4 護照號碼 (負責人)
      "currentCurrency": StoreSetup.get('currencyclass').value,//4.3 收款幣別
      "description": "測試用", // 每次都發一樣
      "discount": StoreSetup.get('discount').value,//4.1 店家折扣
      "handlingFee": StoreSetup.get('handlingfee').value,//4.2 手續費率
      "name": StoreInfo.get('storename').value,//1.1 店家名稱
      "personEmail": ContactInfo.get('email').value,//3.3 Email（聯絡人）
      "personName": ContactInfo.get('contactperson').value,//3.1 姓名（聯絡人）
      "personPhone": ContactInfo.get('contactphone').value,//3.2 電話（聯絡人）
      "phone": StoreInfo.get('companyphone').value, //1.6 公司電話
      "registeredCountry": StoreInfo.get('companycountry').value, //1.4 公司註冊國籍
      "settlementType": StoreSetup.get('settlementType').value,// 4.4 結算方式
      "status": StoreSetup.get('status').value,// 4.5 商家狀態(預設為首次註冊)
      "taxId": StoreInfo.get('taxID').value, //1.3 統一編號
      "type": StoreInfo.get('storeclass').value,//1.2 店家分類
      "url": StoreInfo.get('internetsite').value, //1.7 網址
      "businessType":Business.get('business').value //5.1 業務代碼
    }
    console.log("storeInfo is =>",storeInfo);
    this.storeService.AddStores(storeInfo)
      .subscribe((storeInfo) =>{
        console.log('得到的回覆是 =>', storeInfo);
        this.storeresponse = storeInfo;
        console.log('得到的回覆狀態是 =>',this.storeresponse.status);
        if(this.storeresponse.status == "SUCCESS"){
          this.router.navigate(['/storemanage']);
        }
    })
  }

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
    
    areaforchoose = [
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
    //4.4 結算方式
    settlementTypes = [
      { each: "月結", type: "FULL" },
      { each: "半月結", type: "Half" }
    ]
    //4.5 商家狀態
    statuses = [
      { each: "首次註冊", index: "1" },
      { each: "啟用", index: "2" },
      { each: "商家停用", index: "3" },
      { each: "凍結出金", index: "4" }
    ]

  /* Getters */
  get storename() { return this.profileForm.get('storeinformation').get('storename'); }
  get storeclass() { return this.profileForm.get('storeinformation').get('storeclass') }
  get address() { return this.profileForm.get('storeinformation').get('address') }
  get identity() { return this.profileForm.get('personinchargeinfo').get('identity'); }
  get email() { return this.profileForm.get('contactinfo').get('email'); }
  get taxID() { return this.profileForm.get('storeinformation').get('taxID'); }
  get contactphone() { return this.profileForm.get('contactinfo').get('contactphone'); }
  get discount() { return this.profileForm.get('storesetup').get('discount'); }
  get settlementType() { return this.profileForm.get('storesetup').get('settlementType'); }
  get status() { return this.profileForm.get('storesetup').get('status'); }
  get business() { return this.profileForm.get('businesssetup').get('business'); }
}

/* 統一編號驗證 */
export const ValidatetaxID: ValidatorFn = (control : FormControl): ValidationErrors | null => {
  var invalidList = "00000000,11111111";
    if (/^\d{8}$/.test(control.value) == false || invalidList.indexOf(control.value) != -1) {
        console.log('有錯誤');
        return { taxID: true };
    }

    var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
        sum = 0,
        calculate = function (product) { // 個位數 + 十位數
            var ones = product % 10,
                tens = (product - ones) / 10;
            return ones + tens;
        };
    for (var i = 0; i < validateOperator.length; i++) {
        sum += calculate(control.value[i] * validateOperator[i]);
    }

    if (sum % 10 == 0 || (control.value[6] == "7" && (sum + 1) % 10 == 0)) {
        console.log('正確');
        return null;
    } else {
        console.log('有錯誤');
        return { taxID: true } ;
    }
}

/* 身分證字號認證 */
export const IdCardNumberCheck: ValidatorFn = (control : FormControl): ValidationErrors | null => {
  var city = new Array(1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30);
  // 使用「正規表達式」檢驗格式
  if (!control.value.match(/^[A-Z]\d{9}$/) && !control.value.match(/^[A-Z][A-D]\d{8}$/)) {
    return { identity: true };
  }
  else {
      var total = 0;
      if (control.value.match(/^[A-Z]\d{9}$/)) { //身分證字號
          //將字串分割為陣列(IE必需這麼做才不會出錯)
          control = control.value.split('');
          //計算總分
          total = city[control[0].charCodeAt(0) - 65];
          for (var i = 1; i <= 8; i++) {
              total += eval(control[i]) * (9 - i);
          }
      } else { // 外來人口統一證號
          //將字串分割為陣列(IE必需這麼做才不會出錯)
          control = control.value.split('');
          //計算總分
          total = city[control[0].charCodeAt(0) - 65];
          // 外來人口的第2碼為英文A-D(10~13)，這裡把他轉為區碼並取個位數，之後就可以像一般身分證的計算方式一樣了。
          control[1] = control[1].charCodeAt(0) - 65;
          for (var i = 1; i <= 8; i++) {
              total += eval(control[i]) * (9 - i);
          }
      }
      //補上檢查碼(最後一碼)
      total += eval(control[9]);
      //檢查比對碼(餘數應為0);
      if (total % 10 == 0) {
        console.log('正確')
        return null;
      }
      else {
        return { identity: true };
      }
  }
}
