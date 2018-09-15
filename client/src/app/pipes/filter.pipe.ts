import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {
    if (!items) {
      return []
    }

    if (!value) {
      return items;
    }

    // console.log('typeof value: ', value)
    // console.log('actual typeof: ', typeof(value))

    if(typeof(value)==='string'){
      const myPattern = new RegExp(value, 'i');
      return items.filter(it => it[field].match(myPattern));  
    } else {
      return items.filter(it => {
        // console.log(`indexOf ${it.table} ` + value.indexOf(it[field]))
        return value.indexOf(it[field])>-1
      });
    }

  }

}
