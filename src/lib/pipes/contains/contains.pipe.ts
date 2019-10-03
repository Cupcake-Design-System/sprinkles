import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprContains',
  pure: false
})
export class ContainsPipe implements PipeTransform {
  public transform(items: any, term: any, propertyName: any): any {
    if (!term || !items) {
      return items;
    }

    const toCompare = term.toLowerCase();

    if (propertyName) {
      return items.filter(item => {
        if (!item[propertyName]) {
          return false;
        }
        return item[propertyName].toLowerCase().indexOf(toCompare) !== -1;
      });
    }

    // if no property search all
    return items.filter((item: any) => {
      for (const property in item) {
        if (item[property] === null) {
          continue;
        }
        if (
          item[property]
            .toString()
            .toLowerCase()
            .includes(toCompare)
        ) {
          return true;
        }
      }
      return false;
    });
  }
}
