import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CurrentUser } from '../../../shared/model/user-model';
// service
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-pwd-dialog',
  templateUrl: './pwd.dialog.html',
  styleUrls: ['./pwd.dialog.css']
})
export class PwdDialog implements OnInit {

  private user = new CurrentUser();
  private verCode: string;
  private sendIsdisabled = false;
  private sendBtnTitle = '发送验证码';
  private countDown = 60;
  private newPassword: string;
  private identifies: Array<string>;
  private identify: string;
  // 验证是否通过
  private isPassed = false;
  // 选择框监控
  private identifyTerm = new FormControl();
  // 输入框监控
  private codeTerm = new FormControl();
  // 关闭弹窗
  private isCloseDialog = false;
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private userService: UserService,
    private router: Router,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.identifies = new Array<string>();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.PhoneNumber) {
      this.identifies.push(this.user.PhoneNumber);
    }
    if (this.user.Email) {
      this.identifies.push(this.user.Email);
    }
    // 响应
    this.codeTerm.valueChanges
      .debounceTime(2000)
      .distinctUntilChanged()
      .subscribe((res) => {
        // 存在才可以验证
        if (res) {
          this.verifyCodeSub(res, 2);
        }
      });
    // 选择框 响应
    this.identifyTerm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((identify) => {
        if (identify) {
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
    if (this.identify.includes('@')) {
      this.sendCodeSub(this.identify, '');
    } else {
      this.sendCodeSub('', this.identify);
    }
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
  /**
   * 改变密码
   */
  changePwd() {
    // todo:判定两次输入的密码是否一致
    this.resetPasswordSub(this.verCode, this.newPassword);
  }
  /**
   * 发送验证码(二选一)
   * @param email 邮箱
   * @param phoneNumber 手机号
   */
  sendCodeSub(email: string, phoneNumber: string) {
    return this.userService.sendCodeForForget(email, phoneNumber)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.sendTime();
        } else {
          this.toastr.error('验证码发送失败@_@');
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
          this.isPassed = true;
          this.toastr.success('验证码正确，请修改密码^_^');
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
  /**
    * 重置密码
    * @param restKey 验证码
    * @param password 新密码
  */
  public resetPasswordSub(resetKey: string, password: string) {
    return this.userService.resetPassword(resetKey, password)
      .subscribe((res) => {
        if (res['IsOk']) {
          setTimeout(() => {
            this.toastr.success('即将跳转登录页', '密码修改成功^_^');
            // 清空存储，重新登陆
            localStorage.clear();
            this.router.navigateByUrl('/login');
            window.location.reload(false);
          }, 3000);
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
}
