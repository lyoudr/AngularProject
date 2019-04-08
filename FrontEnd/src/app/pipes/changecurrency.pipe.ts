import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changecurrency'
})
export class ChangecurrencyPipe implements PipeTransform {
  precurrency : string = "TWD";

  transform(value: string, currency?: string): any {
    let str = value.trim();
    let strarr = str.split("~");
    let extsmall = Number(strarr[0]);
    let extlarge = Number(strarr[1].match(/\d+/g));
    console.log('extsmall is =>', extsmall);
    console.log('extlarge is =>', extlarge);
    if (this.precurrency == "TWD"){
      if(currency == "TWD"){
        this.precurrency = currency;
        return value;
      }else if(currency == "USD"){
        this.precurrency = currency;
        console.log('結果是 =>', Math.round(extsmall/30.5) + ' ~ ' + Math.round(extlarge/30.5) + 'TWD')
        return (Math.round(extsmall/30.5)) + ' ~ ' + (Math.round(extlarge/30.5)) + 'USD';
      }else if(currency == "JPY"){
        this.precurrency = currency;
        console.log('結果是 =>', Math.round(extsmall*3.63) + ' ~ ' + Math.round(extlarge*3.63) + 'TWD')
        return (Math.round(extsmall*3.63)) + ' ~ ' + (Math.round(extlarge*3.63)) + 'JPY';
      }
    } else if (this.precurrency == "USD"){

    } else if (this.precurrency == "JPY"){

    }
  }

}
