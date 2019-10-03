import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sprHighlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, args: string): any {
    if (args && value) {
      const sanitizedVal = this.sanitizer.sanitize(SecurityContext.HTML, value);
      const sanitizedArgs =
        this.sanitizer.sanitize(SecurityContext.HTML, args) || '';

      if (sanitizedVal) {
        const startIndex = sanitizedVal
          .toLowerCase()
          .indexOf(sanitizedArgs.toLowerCase());
        if (startIndex !== -1) {
          const endLength = sanitizedArgs.length;
          const matchingString = sanitizedVal.substr(startIndex, endLength);

          return this.sanitizer.bypassSecurityTrustHtml(
            sanitizedVal.replace(
              matchingString,
              '<mark>' + matchingString + '</mark>'
            )
          );
        }
      }
    }
    return value;
  }
}
