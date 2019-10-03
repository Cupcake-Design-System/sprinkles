import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprFileSize'
})
export class FileSizePipe implements PipeTransform {
  private options: ISizeOption[] = [
    { divisor: 1048576, unit: 'mb' },
    { divisor: 1024, unit: 'kb' },
    { divisor: 1, unit: 'b' }
  ];

  public transform(value: number, exponent: string): string {
    for (const option of this.options) {
      const size = value / option.divisor;
      const mod = value % option.divisor;
      if (size > 1) {
        return (mod > 0 ? size.toFixed(2) : size) + option.unit;
      }
    }
    return value + 'b';
  }
}

interface ISizeOption {
  divisor: number;
  unit: string;
}
