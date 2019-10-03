import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprInsertHtml'
})
export class InsertHtmlPipe implements PipeTransform {
  transform(content: any): any {
    return `${content}`;
  }
}
