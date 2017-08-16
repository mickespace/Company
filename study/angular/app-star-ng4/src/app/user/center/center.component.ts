import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/RX';
import { CurrentUser } from '../../shared/model/user-model';
import { LocalStorageService } from '../../shared/service/localStorage.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {

  public user = new CurrentUser();
  public subscription: Subscription;

  constructor(
    private title: Title,
    private localService: LocalStorageService,
    private userService: UserService
  ) {
    this.title.setTitle('用户中心');
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.subscription = this.localService.getStorage('currentUser').subscribe(res => {
      if (res.value) {
        this.user = JSON.parse(res.value);
      }
    });
  }
  /**
   * 更新用户头像
   * @param event 事件
   */
  private updateAvatar(event) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('avatar', file, file.name);
      this.userService.updateAvatar(formData).subscribe(res => {
        if (res['IsOk']) {
          this.user.Avatar = res['Data'];
          this.localService.sendStorage('currentUser', JSON.stringify(this.user));
        } else {
          console.error(res['Message']);
        }
      });
    }
  }
}
