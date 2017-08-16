/*
 * @Author: zsq 
 * @Date: 2017-06-20 14:16:48 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-20 15:57:27
 * @Desc: bind dialog for email / phone
 */

import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormControl } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
// service
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit {

  // title
  private bindTitle: string;
  private bindStrTerm = new FormControl();
  private bindStr: string;
  private verCode: string;
  private sendIsdisabled = false;
  private sendBtnTitle = '发送验证码';
  private countDown = 60;
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private userService: UserService,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.bindTitle = this.data;
  }

  ngOnInit() {
    // 响应
    this.bindStrTerm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((res) => {
        if (res) {
          this.sendIsdisabled = false;
        } else {
          this.sendIsdisabled = true;
        }
      });
  }
  /**
   * 发送验证码
   */
  sendCode() {
    if (this.bindStr && this.bindStr.includes('@')) {
      this.sendCodeSub(this.bindStr, '');
    } else {
      this.sendCodeSub('', this.bindStr);
    }
  }
  /**
   * binding
   */
  binding() {
    this.verifyCodeSub(this.verCode, 3);
  }
  /**
    * send verify code api 绑定专用
    * @param email 邮箱
    * @param phoneNumber 手机号码
  */
  sendCodeSub(email: string, phoneNumber: string) {
    return this.userService.sendCodeForBinding(email, phoneNumber)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.sendTime();
        } else {
          this.toastr.error('验证码发送失败@_@');
        }
      });
  }
  /**
   * account bind email or phone
   * @param email 邮箱
   * @param phoneNumber 手机
 */
  accountBindSub(email: string, phoneNumber: string) {
    return this.userService.accountBind(email, phoneNumber)
      .subscribe((res) => {
        if (res['IsOk']) {
          setTimeout(() => {
            this.toastr.success('绑定成功^_^');
          }, 3000);
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
  /**
 * 验证验证码
 * @param resetKey 验证码
 * @param type 验证码类型
 */
  public verifyCodeSub(resetKey: string, type: number) {
    return this.userService.verifyCode(resetKey, type)
      .subscribe((res) => {
        if (res['IsOk']) {
          // todo bind operate
          if (this.bindStr.includes('@')) {
            this.accountBindSub(this.bindStr, '');
          } else {
            this.accountBindSub('', this.bindStr);
          }
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
  /**
   * 60秒倒计时
   */
  public sendTime() {
    if (this.countDown === 0) {
      this.sendBtnTitle = '重新发送';
      this.sendIsdisabled = false;
      this.countDown = 60;
    } else {
      this.sendBtnTitle = this.countDown + '秒后再次发送';
      this.sendIsdisabled = true;
      this.countDown--;
      setTimeout(() => {
        this.sendTime();
      }, 1000);
    }
  }
}
