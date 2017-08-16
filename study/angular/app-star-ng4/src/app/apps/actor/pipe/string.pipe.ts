import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringTran' })
export class StringTran implements PipeTransform {
    transform(value: any): string {
        if (value === '' || value === null || value === undefined) {
            return '---';
        } else {
            return value;
        }
    }
    // tslint:disable-next-line:eofline
}