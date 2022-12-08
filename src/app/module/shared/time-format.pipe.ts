import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    value = Number(value);
var d = Math.floor(value / (3600*24));
var h = Math.floor(value % (3600*24) / 3600);
var m = Math.floor(value % 3600 / 60);
var s = Math.floor(value % 60);

var dDisplay = d > 0 ? d + (d == 1 ? ":" : ":") : "";
var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
var sDisplay = s > 0 ? s + (s == 1 ? "":"") : "";
return (dDisplay==":"?"":dDisplay) + (hDisplay==":"?"":hDisplay) + (mDisplay==":"?"":mDisplay) + (sDisplay==":"?"":sDisplay);
    //return null;
  }

}
