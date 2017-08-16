import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesizeTran' })
export class FilesizeTran implements PipeTransform {
    transform(value: any): string {
        if (value === undefined) {
            return '';
        } else {
            const val = this.bytesToSize(value);
            return val;
        }
    }
    bytesToSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        var k = 1024,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i];
    }
}