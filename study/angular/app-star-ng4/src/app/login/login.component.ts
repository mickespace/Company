import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoginRequest } from '../shared/model/user-login-model';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import service
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userRe: LoginRequest = new LoginRequest();
  public loading = false;
  public userName: string;
  public password: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public tabTitle: Title,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
    public userService: UserService
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.tabTitle.setTitle('登录');
  }

  /**
   * 登录
   */
  public doLogin() {
    this.loading = true;
    this.userName = this.userRe.userName;
    this.password = this.userRe.password;
    this.userService.login(this.userName, this.password)
      .subscribe(
      (data) => {
        if (data['IsOk'] === true) {
          const activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
          const routerState: RouterState = this.router.routerState;
          const routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
          sessionStorage.setItem('isLogin', 'true');
          // 存储 currentUser
          localStorage.setItem('currentUser', JSON.stringify(data['Data']));
          // 存储 userToken
          const tokenKey = data['Data'].TokenKey as string;
          this.getUserToken(tokenKey);
        } else {
          this.toastr.error('账号或密码有误，请重新输入', '登录失败！');
          this.loading = false;
        }
      }, (error) => {
        console.log(error);
      });
  }
  /**
 * 获取userToken
 * @param tokenKey tokenKey
 */
  public getUserToken(tokenKey: string) {
    return this.userService.getUserToken(tokenKey).subscribe((res) => {
      const userToken = res['Data'].UserToken;
      localStorage.setItem('userToken', userToken);
      this.toastr.success('即将跳转首页', '登录成功！');
      setTimeout(() => {
        this.router.navigateByUrl('');
        window.location.reload(false);
      }, 1000);
    }, (error) => {
      console.log(error);
    });
  }
}
