import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexReform' })
export class SexReform implements PipeTransform {
    public transform(val: number): string {
        switch (val) {
            case 0: return '成员可见';
            case 1: return '所有人可见';
            default: return '公开性';
        }
    }

}