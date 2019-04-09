import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changecurrency'
})
export class ChangecurrencyPipe implements PipeTransform {
  precurrency : string = "TWD";
  newcurrencyarray = [];

  transform(value: string, currency?: string): any {
    let str = value.trim();
    let strarr = str.split("~");
    let extsmall = Number(strarr[0]);
    let extlarge = Number(strarr[1].match(/\d+/g));
    console.log('extsmall is =>', extsmall);
    console.log('extlarge is =>', extlarge);
    
    if (this.precurrency == "TWD"){
      if (currency == "TWD"){
        this.precurrency = currency;
        this.newcurrencyarray.push(value);
      } else if(currency == "USD"){
        this.precurrency = currency;
        console.log('結果是 =>', Math.round(extsmall/30.5) + ' ~ ' + Math.round(extlarge/30.5) + 'TWD');
        this.newcurrencyarray.push(Math.round(extsmall/30.5) + ' ~ ' + Math.round(extlarge/30.5) + 'TWD');
      } else if(currency == "JPY"){
        this.precurrency = currency;
        console.log('結果是 =>', Math.round(extsmall*3.63) + ' ~ ' + Math.round(extlarge*3.63) + 'TWD');
        this.newcurrencyarray.push(Math.round(extsmall*3.63) + ' ~ ' + Math.round(extlarge*3.63) + 'JPY');
      }
      console.log('新的 currencyarray 是 =>', this.newcurrencyarray);
    } else if (this.precurrency == "USD"){

    } else if (this.precurrency == "JPY"){

    }
  }

}
