import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
// toastr
import { ToastsManager } from 'ng2-toastr';
// service
import { UserService } from '../shared/service/user.service';
import { ConfigService } from '../shared/service/config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // step number
  public stepNumber: number;
  // 账号-手机
  public isPhone: boolean;
  // 验证码
  public verifyCode: string;
  public verifyCodeServe: string;
  public countDown = 60;
  public sendBtnTitle = '重新发送';
  public canSend = false;
  // 账号信息
  public account: string;
  public password: string;
  public passwordConfirm: string;
  public RealName: string;
  public selectedIndustry: string;
  public industrys: Array<any>;
  public CompanyName = '';
  public selectedJob: string;
  public jobs: Array<any>;
  public InviteCode: string;

  constructor(
    public tabTitle: Title,
    public router: Router,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
    public userService: UserService,
    public configService: ConfigService
  ) {
    toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.tabTitle.setTitle('注册账号');
    this.stepNumber = 1;
  }
  /**
     * 检查账户
     */
  checkAccount() {
    // 进行账号检测
    this.checkAndSendCodeSub(this.account);
    // phone or email
    if (this.account.includes('@')) {
      this.isPhone = false;
    } else {
      this.isPhone = true;
    }
  }
  /**
   * 发送验证码
   */
  sendCode() {
    this.checkAndSendCodeSub(this.account);
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
    // 调用验证方法
    this.verifyCodeSub(this.verifyCode, 1);
  }
  /**
   * 设置账号信息
   */
  register() {
    // todo:判定两个密码是否一致
    let email = '';
    let phone = '';

    if (this.isPhone) {
      phone = this.account;
    } else {
      email = this.account;
    }
    this.registerSub(this.password, this.verifyCode, email, phone,
      this.RealName, this.InviteCode, this.selectedIndustry,
      this.CompanyName, this.selectedJob);
  }
  /**
   * check user and send code subscribe
   * @param userName 用户名
   */
  public checkAndSendCodeSub(userName: string) {
    return this.userService.sendCodeForRegister(userName)
      .subscribe((res) => {
        const isOk = res['IsOk'];
        const msg = res['Message'];
        console.log('IsOk:' + isOk);
        if (!isOk) {
          this.toastr.error(msg);
        } else {
          this.verifyCodeServe = res['Data'];
          console.log('验证码为：' + this.verifyCodeServe);
          this.stepNumber = 2;
        }
      }, (error) => {
        console.log(error);
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
          this.stepNumber = 3;
          this.getIndustrysSub();
          this.getJobsSub();
        } else {
          this.toastr.error(res['Message']);
        }
      });
  }
  /**
   * 用户注册
   */
  public registerSub(
    password: string,
    verifyCode: string,
    email: string,
    phoneNumber: string,
    realName: string,
    inviteCode: string,
    industry: string,
    companyName: string,
    jobPosition: string
  ) {
    return this.userService.register(password, verifyCode, email, phoneNumber, realName, inviteCode, industry, companyName, jobPosition)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.toastr.success('即将跳转登录页', '注册成功！');
          setTimeout(() => {
            this.router.navigateByUrl('/login');
            window.location.reload(false);
          }, 1000);
        } else {
          this.toastr.error(res['Message']);
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
        if (this.industrys.length > 0) {
          this.selectedIndustry = this.industrys[0];
        }
      });
  }
  /**
   * 获取职位信息
   */
  public getJobsSub() {
    return this.configService.getJobs()
      .subscribe((res) => {
        this.jobs = res['Data'];
        if (this.jobs.length > 0) {
          this.selectedJob = this.jobs[0];
        }
      });
  }
}
