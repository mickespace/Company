/*
 * @Author: zsq 
 * @Date: 2017-07-10 16:46:24 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-10 20:27:14
 *项目子导航页主视图
 */

import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/service/config.service';
import { LocalStorageService } from '../../shared/service/localStorage.service';
import { AppConfig } from '../../shared/model/apps-config-model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private proAppList = new Array<AppConfig>();
  private proRouteList = new Array<AppConfig>();
  private localAppAddress = 'assets/config/apps.config.json';
  constructor(
    private configService: ConfigService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit() {
    const curProject = JSON.parse(localStorage.getItem('currentProject'));
    this.getAppsConfigSub(this.localAppAddress, curProject.Apps);
    // currenProject监控
    this.storageService.getStorage('currentProject').subscribe(latestPro => {
      const localApps = JSON.parse(latestPro.value).Apps;
      this.getAppsConfigSub(this.localAppAddress, localApps);
    });
  }
  /**
   * match pro nav by appconfig
   * @param localUrl app config address
   * @param appKeyList cur project own appKey list
   */
  public getAppsConfigSub(localUrl: string, appKeyList: any) {
    return this.configService.getLocalAppsConfig(localUrl)
      .subscribe((res) => {
        this.proAppList = res['proapps'];
        this.proRouteList.length = 0;
        this.proAppList.forEach(app => {
          const key = app.appKey.toLowerCase();
          if (appKeyList.includes(key)) {
            this.proRouteList.push(app);
          }
        });

      });
  }
}
