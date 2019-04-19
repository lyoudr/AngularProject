import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changecurrency'
})
export class ChangecurrencyPipe implements PipeTransform {
  precurrency : string = "TWD";

  transform(value: string, currency: string): any {
    let str = value.trim();
    let strarr = str.split("~");
    let extsmall = Number(strarr[0]);
    let extlarge = Number(strarr[1].match(/\d+/g));
    console.log('extsmall is =>', extsmall);
    console.log('extlarge is =>', extlarge);
    
    if (this.precurrency == "TWD"){
      if (currency == "TWD"){
        return (value);
      } else if(currency == "USD"){
        return(Math.round(extsmall/30.5).toString() + ' ~ ' + Math.round(extlarge/30.5).toString() + 'USD');
      } else if(currency == "JPY"){
        return(Math.round(extsmall*3.63) + ' ~ ' + Math.round(extlarge*3.63) + 'JPY');
      }
    } else if (this.precurrency == "USD"){

    } else if (this.precurrency == "JPY"){

    }
  }
}
