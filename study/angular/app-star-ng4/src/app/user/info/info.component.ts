/*
 * @Author: zsq
 * @Date: 2017-06-16 10:01:45
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-17 20:54:22
 * @Desc: 用户信息展示
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CurrentUser } from '../../shared/model/user-model';
import { UserService } from '../../shared/service/user.service';
import { ConfigService } from '../../shared/service/config.service';
import { LocalStorageService } from '../../shared/service/localStorage.service';
import { Info } from '../model/info-model';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public userToken: string;
  public user = new CurrentUser();
  public info = new Info();
  public isDisabled = true; // 是否可以编辑

  public industrys: Array<any>;
  public jobs: Array<any>;
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private localService: LocalStorageService,
    private title: Title,
    private toastr: ToastsManager,
    private vcf: ViewContainerRef
  ) {
    this.title.setTitle('个人信息');
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const map = new Array('_id', 'RealName', 'Birthdate', 'Location', 'Industry', 'CompanyName', 'JobPosition', 'Apps', 'UserType');
    this.getUserInfoSub(this.user._id, JSON.stringify(map));
    this.getIndustrysSub();
    this.getJobsSub();
  }
  /**
   * edit
   */
  onEdit() {
    this.isDisabled = false;
  }
  /**
   * save
   */
  onSave() {
    const data = JSON.stringify(this.info);
    this.updateUserInfoSub(data);
  }
  /**
   * cancle
   */
  onCancle() {
    this.isDisabled = true;
  }
  /**
   *  获取用户信息
   * @param id id
   * @param map 映射数组
   */
  public getUserInfoSub(id: string, map: string) {
    return this.userService.getUserInfo(id, map)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.info = res['Data'];
        }
      });
  }
  /**
     * 获取行业信息
     */
  public getIndustrysSub() {
    return this.configService.getIndustrys()
      .subscribe((res) => {
        this.industrys = res['Data'];
      });
  }
  /**
   * 获取职位信息
   */
  public getJobsSub() {
    return this.configService.getJobs()
      .subscribe((res) => {
        this.jobs = res['Data'];
      });
  }
  /**
   * 更新用户信息
   * @param data 欲修改的用户信息
   */
  public updateUserInfoSub(data: string) {
    return this.userService.updateUserInfo(data)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.toastr.success('您的信息修改成功^_^');
          this.isDisabled = true;
          this.user.RealName = this.info.RealName;
          this.user.UserType = this.info.UserType;
          // 同步currentUser
          // localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.localService.sendStorage('currentUser', JSON.stringify(this.user));
        } else {
          this.toastr.error('抱歉，您的信息修改失败@_@');
        }
      });
  }
}
