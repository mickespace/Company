/*
 * @Author: zsq 
 * @Date: 2017-07-31 10:29:04 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-07-31 10:33:58
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userTypeTrans' })
export class UserTypeTrans implements PipeTransform {
    transform(value: any) {
        switch (value) {
            case 0: return '普通用户';
            case 1: return '内测用户';
            case 2: return '内部用户';
            case 10: return '高级用户';
            case 100: return '企业用户';
        }
    }

}