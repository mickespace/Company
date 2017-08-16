import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// toastr
import { ToastsManager } from 'ng2-toastr';
// service
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  // step number
  public stepNumber: number;
  // 账号
  public account: string;
  // 账号-手机
  public isPhone: boolean;
  // 短信验证码
  public verifyCode: string;
  public verifyCodeServe: string;
  public countDown = 60;
  public sendBtnTitle = '重新发送';
  public canSend = false;
  // 新密码
  public newPassword: string;
  public newPasswordConfirm: string;

  constructor(
    public tabTitle: Title,
    public router: Router,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
    public userService: UserService
  ) {
    toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.tabTitle.setTitle('找回密码');
    // 激活step one
    this.stepNumber = 1;
  }
  /**
   * check and send code
   */
  checkAccount() {
    // phone or email
    if (this.account.includes('@')) {
      this.isPhone = false;
      this.checkAndSendCodeSub(this.account, '');
    } else {
      this.isPhone = true;
      this.checkAndSendCodeSub('', this.account);
    }
  }
  /**
   * 重新发送验证码
   */
  public reSendCode() {
    this.checkAccount();
    this.sendTime();
  }
  /**
   * 60秒倒计时
   */
  public sendTime() {
    if (this.countDown === 0) {
      this.sendBtnTitle = '重新发送';
      this.canSend = false;
      this.countDown = 60;
    } else {
      this.sendBtnTitle = this.countDown + '秒后再次发送';
      this.canSend = true;
      this.countDown--;
      setTimeout(() => {
        this.sendTime();
      }, 1000);
    }
  }
  /**
   * 检测验证码
   */
  checkCode() {
    this.verifyCodeSub(this.verifyCode, 2);
  }
  /**
   * 修改密码
   */
  changePassword() {
    // todo:判定两次密码是否一致
    this.resetPasswordSub(this.verifyCode, this.newPassword);
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
          this.stepNumber = 3;
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
  /**
   * 发送验证码 找回密码专用
   * @param email 邮箱
   * @param phoneNumber 手机号码
   */
  public checkAndSendCodeSub(email: string, phoneNumber: string) {
    return this.userService.sendCodeForForget(email, phoneNumber)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.stepNumber = 2;
          console.log('验证码：' + res['Data']);
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
            this.toastr.success('即将跳转登录页', '密码重置成功！');
            this.router.navigateByUrl('/login');
            window.location.reload(false);
          }, 1000);
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
}
