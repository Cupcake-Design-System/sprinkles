import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprIllions'
})
export class IllionsPipe implements PipeTransform {
  transform(input: number, decimalPlaces: number): string {
    const suffixes = ['k', 'M', 'B', 'T', 'Q'];

    if (Number.isNaN(input)) {
      return '';
    }
    if (input < 1000) {
      return `$${input}`;
    }

    const l: number = Math.floor(Math.log(input) / Math.log(1000));
    const num: number = input / Math.pow(1000, l);

    return '$' + num.toFixed(decimalPlaces) + '' + suffixes[l - 1];
  }
}
