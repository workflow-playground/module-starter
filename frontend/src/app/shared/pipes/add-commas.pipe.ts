import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bcAddCommas' })
export class AddCommasPipe implements PipeTransform {
  transform(authors: null | string[]) {
    if (!authors) {
      return 'Author Unknown';
    }

    switch (authors.length) {
      case 0:
        return 'Author Unknown';
      case 1:
        return authors[0];
      case 2:
        return authors.join(' and ');
      default:
        return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`;
    }
  }
}
