/**
 * desc:路由守卫
 * auth:zsq
 * time:2017-6-7 15:43:38
 */
import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/RX';

import { ConfigService } from './config.service';
import { AppConfig } from '../model/apps-config-model';

@Injectable()
export class AuthGuardService implements CanLoad {

  // 已拥有appKey列表
  public appKeyList = new Array<string>();
  // 当前工程中有的app
  public curProjectApps = new Array<AppConfig>();
  // 当前url对应的appKey
  public curUrlAppKey = '';
  constructor(public configService: ConfigService) {
    this.appKeyList = JSON.parse(localStorage.getItem('appKeyList'));
    this.curProjectApps = JSON.parse(localStorage.getItem('currentProjectApps'));
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    // 取出当前url对应的appKey
    this.curProjectApps.forEach(app => {
      if (app.appName === route.path) {
        this.curUrlAppKey = app.appKey.toLowerCase();
      }
    });
    if (this.appKeyList.includes(this.curUrlAppKey)) {
      return true;
    }
    console.log('恭喜你被阻击了！');
    return false;
  }
}
