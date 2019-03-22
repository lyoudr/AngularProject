import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Accountarray } from './views/accountlist/accountarray';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const accounts = [
      {id: 1, Date: '2018.02.11', Phone: '0954678908', Name: 'Mr. Nice', Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄'},
      {id: 2, Date: '2018.02.11', Phone: '0954678908', Name: 'Narco', Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄'},
      {id: 3, Date: '2018.02.11', Phone: '0954678908', Name: 'Bombasto',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 4, Date: '2018.02.11', Phone: '0954678908', Name: 'Celeritas',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 5, Date: '2018.02.11', Phone: '0954678908', Name: 'Magneta',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 6, Date: '2018.02.11', Phone: '0954678908', Name: 'RubberMan',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 7, Date: '2018.02.11', Phone: '0954678908', Name: 'Dynama',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 8, Date: '2018.02.11', Phone: '0954678908', Name: 'Dr IQ',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 9, Date: '2018.02.11', Phone: '0954678908', Name: 'Magma',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' },
      {id: 10, Date: '2018.02.11', Phone: '0954678908', Name: 'Tornado',Email: 'abc@gamil.com', Status: 'Normal', DetailInfo1: '會員資料', DetailInfo2:'交易紀錄' }
    ];
    return {accounts};

    /*genId(accounts: Accountarray) {
      return accounts.length > 0 ? Math.max(...accounts.map(each => each.id)) + 1 : 1;
    }*/
  }
}
