import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../shared/service/user.service';
import { App } from './app-model';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private apps = new Array<App>();
  constructor(
    private title: Title,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private userService: UserService
  ) {
    this.title.setTitle('应用管理');
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.getUserAppsSub();
  }
  getUserAppsSub() {
    this.userService.getUserApps('', '')
      .subscribe((res) => {
        if (res['IsOk']) {
          const resApps = res['Data'];
          resApps.forEach(resApp => {
            const app = new App();
            app.AppKey = resApp.AppKey;
            app.Icon = resApp.Icon;
            app.Name = resApp.Name;
            this.apps.push(app);
          });
        }
      });
  }
}
