import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number = 31): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength - 3) + '...';
    } else {
      return value;
    }
  }

}
