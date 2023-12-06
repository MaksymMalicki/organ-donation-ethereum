import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigIntToNumber'
})
export class BigIntToNumberPipe implements PipeTransform {

  transform(value: any): any {
    if(typeof value === 'bigint') {console.log(Number(value)); return Number(value);}
    return value;
  }

}
