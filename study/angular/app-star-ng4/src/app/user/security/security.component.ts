import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CurrentUser } from '../../shared/model/user-model';
// dialog
import { PwdDialog } from './pwd/pwd.dialog';
import { BindComponent } from './bind/bind.component';

// service
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  private user = new CurrentUser();

  constructor(
    private title: Title,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private userService: UserService
  ) {
    this.title.setTitle('安全设置');
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  /**
   * 修改密码弹窗
   */
  changePassword() {
    const dialogRef = this.dialog.open(PwdDialog, {
      height: '400px',
      width: '412px',
      disableClose: false,
      data: '我是进来的数据'
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
  /**
   * 绑定邮箱
   */
  bindEmail() {
    const dialogRef = this.dialog.open(BindComponent, {
      height: '290px',
      width: '412px',
      data: '绑定邮箱'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.syncAccount();
    });
  }
  /**
 * 绑定手机
 */
  bindPhone() {
    const dialogRef = this.dialog.open(BindComponent, {
      height: '290px',
      width: '412px',
      data: '绑定手机'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.syncAccount();
    });
  }
  /**
   * 通过 currentUser信息
   */
  syncAccount() {
    const map = new Array('Email', 'PhoneNumber');
    this.getUserInfoSub(this.user._id, JSON.stringify(map));
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
          this.user.Email = res['Data'].Email;
          this.user.PhoneNumber = res['Data'].PhoneNumber;
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        }
      });
  }
}
