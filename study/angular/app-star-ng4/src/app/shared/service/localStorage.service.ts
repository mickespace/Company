/*
 * @Author: zsq
 * @Date: 2017-07-04 10:44:11
 * @Last Modified by: 
 * @Last Modified time: 2017-07-13 22:04:54
 *localStorage 服务-用于监控存储值的变化
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/RX';

@Injectable()
export class LocalStorageService {
    // project
    private subject = new Subject<any>();
    // user
    private subjectUser = new Subject<any>();
    constructor() { }

    /**
     * 设置并以消息发送storage
     * @param storageName storage 名称
     * @param storageValue storage 值
     */
    sendStorage(storageName: string, storageValue: string) {
        localStorage.setItem(storageName, storageValue);
        // 消息类型判定
        if (storageName === 'currentUser') {
            this.subjectUser.next({ value: storageValue });
        }
        if (storageName === 'currentProject') {
            this.subject.next({ value: storageValue });
        }
    }
    /**
     * 获得storage
     */
    getStorage(storageName: string): Observable<any> {
        if (storageName === 'currentUser') {
            return this.subjectUser.asObservable();
        }
        if (storageName === 'currentProject') {
            return this.subject.asObservable();
        }
    }
}