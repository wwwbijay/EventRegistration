import { Injectable } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  
  delimeter:string = '-';
  globalDateFormat = 'yyyy/MM/dd';

  constructor() {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.delimeter);

      switch (this.globalDateFormat) {
        case 'dd/MM/yyyy': {
          return {
            day : parseInt(date[0], 10),
            month : parseInt(date[1], 10),
            year : parseInt(date[2], 10)
          };
          break;
        }
        case 'MM/dd/yyyy': {
          return {
            year : parseInt(date[0], 10),
            month : parseInt(date[1], 10),
            day : parseInt(date[2], 10)
          };
          break;
        }
        default: {
          return {
            month : parseInt(date[0], 10),
            day : parseInt(date[1], 10),
            year : parseInt(date[2], 10)
          };
          break;
        }
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {

    switch (this.globalDateFormat) {
      case 'dd/MM/yyyy': {
        return date
        ? date.day + this.delimeter + date.month + this.delimeter + date.year
        : '';
        break;
      }
      case 'MM/dd/yyyy': {
        return date
        ? date.month + this.delimeter + date.day + this.delimeter + date.year
        : '';
        break;
      }
      default: {
        return date
        ? date.year + this.delimeter + date.month + this.delimeter + date.day
        : '';
        break;
      }
      
    }
  }
}
