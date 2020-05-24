import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUser'
})
export class FiltroUserPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === "" || arg.length > 4 ) return value;
    
    const resultUser = [];

    for (const user of value ){
      if (user.Amos.toUpperCase().indexOf(arg.toUpperCase()) > -1){
        resultUser.push(user);
        console.log('Hecho');
      }
    }
    return resultUser;
  }

}
