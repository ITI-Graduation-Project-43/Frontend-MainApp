import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPlus'
})
export class NumberPlusPipe implements PipeTransform {

  transform(value: number): string {
    if (parseInt(`${value / 100000}`) > 0) {
      while(value > 100) {
        value = value / 100
      }
      let findalValue = parseInt(value.toString());
      if(findalValue != value) {
        return (findalValue * 10) + ',000+';
      }
      return findalValue + ',000+';
    }
    else {
      return value.toLocaleString('en-US');
    }
  }

}
