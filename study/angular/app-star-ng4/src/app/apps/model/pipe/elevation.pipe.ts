import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elevationTran' })
export class ElevationTran implements PipeTransform {
    public transform(value: any): string {
        switch (value) {
            case 0: return '建筑体系';
            case 1: return '结构体系';
            default: return '';
        }
    }
}