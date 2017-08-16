/*
 * @Author: zsq
 * @Date: 2017-07-13 15:35:54
 * @Last Modified by: 
 * @Last Modified time: 2017-07-13 16:54:11
 *web socket 通信
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WebSocketService {

  private subject: Subject<MessageEvent>;

  constructor() { }

  /**
   * 连接服务端
   * @param url 链接地址
   */
  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('successfully contected:' + url);
    }
    return this.subject;
  }

  public create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);
    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
