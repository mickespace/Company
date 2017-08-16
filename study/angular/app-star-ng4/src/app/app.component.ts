/*
 * @Author: zsq
 * @Date: 2017-06-06 17:57:00
 * @Last Modified by: zsq
 * @Last Modified time: 2017-07-31 20:31:20
 */

import { Component, ViewContainerRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';
// theme
import { OverlayContainer } from '@angular/material';
// toastr
import { ToastsManager } from 'ng2-toastr';
// material-MdDialog
import { MdDialog } from '@angular/material';
// project
import { Project } from './shared/model/project-model';
// params
import { ListParams } from './shared/model/listParams-model';
import { AppConfig } from './shared/model/apps-config-model';
// import service
import { UserService } from './shared/service/user.service';
import { ProjectService } from './shared/service/project.service';
import { ConfigService } from './shared/service/config.service';
// local test
import { LocalStorageService } from './shared/service/localStorage.service';
// dialog
import { SetDialog } from './set/set.dialog';
import { CreateProComponent } from './dialog/create-pro/create-pro.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // 消息
  public subscription: Subscription;
  public isLogined: boolean;
  // 当前用户
  public currentUser: any;
  // 当前项目
  public currentProject: Project;
  // 拥有项目
  public ownProjects: Array<Project>;
  // nav-下拉项目列表
  private navProjects: Array<Project>;
  // nav的apps
  public navAppList: Array<AppConfig>;
  public navRouteList: Array<AppConfig>;
  // down apps
  public downAppList: Array<AppConfig>;
  public downRouteList: Array<AppConfig>;
  // can create project
  private canCreate = false;
  private canCreateCount = 0;
  constructor(
    public router: Router,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
    public userService: UserService,
    public projectService: ProjectService,
    public configService: ConfigService,
    public localService: LocalStorageService,
    private dialog: MdDialog,
    private overlayCon: OverlayContainer
  ) {
    toastr.setRootViewContainerRef(vcf);
    // 初始化
    this.currentProject = new Project();
    this.ownProjects = new Array<Project>();
    this.navProjects = new Array<Project>();
    this.navAppList = new Array<AppConfig>();
    this.navRouteList = new Array<AppConfig>();
    this.downAppList = new Array<AppConfig>();
    this.downRouteList = new Array<AppConfig>();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // default theme
    const theme = sessionStorage.getItem('theme');
    if (theme) {
      this.overlayCon.themeClass = theme;
    } else {
      // default
      this.overlayCon.themeClass = 'default-app-theme';
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLogined = Boolean(sessionStorage.getItem('isLogin'));
    // no logined,to login
    if (!this.isLogined) {
      // clear localStorage
      localStorage.clear();
      this.router.navigateByUrl('/login');
    } else {
      this.getProjectListSub();
    }
    // 监控-user
    this.subscription = this.localService.getStorage('currentUser').subscribe(res => {
      this.currentUser = JSON.parse(res.value);
    });
    // 监控-project
    this.subscription = this.localService.getStorage('currentProject').subscribe(res => {
      this.currentProject = JSON.parse(res.value);
      localStorage.setItem('appKeyList', JSON.stringify(this.currentProject.Apps));
      localStorage.setItem('projectId', this.currentProject._id);
      // nav视图改变
      this.getAppsConfigSub('assets/config/apps.config.json');
    });
  }

  /**
   * 退出
   */
  public doLogout(): void {
    this.isLogined = false;
    sessionStorage.clear();
    localStorage.clear();
    this.toastr.info('即将跳转至登录页面', '退出登录成功');
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      window.location.reload();
    }, 1000);
  }
  /**
   * 创建项目
   */
  onCreateProject() {
    const dialogRef = this.dialog.open(CreateProComponent, {
      width: '620px',
      height: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getProjectListSub();
      }
    });
  }
  /**
   * 切换项目
   */
  switchProject(project) {
    this.currentProject = project;
    this.localService.sendStorage('currentProject', JSON.stringify(this.currentProject));
    localStorage.setItem('appKeyList', JSON.stringify(this.currentProject.Apps));
    localStorage.setItem('projectId', this.currentProject._id);
    // nav视图改变
    this.getAppsConfigSub('assets/config/apps.config.json');
  }
  /**
   * 获取用户拥有项目列表
   * @param userToken 用户令牌
   */
  public getProjectListSub() {
    const listParams = new ListParams();
    listParams.Map = new Array('_id', 'Name', 'Icon', 'Description', 'OwnerId', 'CreateorId', 'CreatedDate', 'Apps');
    const params = JSON.stringify(listParams);
    return this.projectService.getProjectList(params)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.ownProjects = res['Data'];
          localStorage.setItem('ownProjects', JSON.stringify(this.ownProjects));
          this.currentProject = this.ownProjects[0];
          // set nav projects
          this.navProjects = this.ownProjects.slice(0, 4);
          this.localService.sendStorage('currentProject', JSON.stringify(this.currentProject));
          localStorage.setItem('appKeyList', JSON.stringify(this.currentProject.Apps));
          localStorage.setItem('projectId', this.currentProject._id);
          // calculate user can-create project number:first
          this.caculateProNumber();
          // base currentProject match it's apps
          this.getAppsConfigSub('assets/config/apps.config.json');
        } else {
          this.toastr.info('获取项目列表失败');
        }
      });
  }
  /**
   * 获取配置sub
   * @param localUrl 路径
   */
  public getAppsConfigSub(localUrl: string) {
    return this.configService.getLocalAppsConfig(localUrl)
      .subscribe((res) => {
        localStorage.setItem('currentProjectApps', JSON.stringify(res['apps']));
        const appKeyList = JSON.parse(localStorage.getItem('appKeyList'));
        // nav apps
        this.navAppList = res['navapps'];
        this.navRouteList.length = 0;
        this.navAppList.forEach(app => {
          const key = app.appKey.toLowerCase();
          if (appKeyList.includes(key)) {
            this.navRouteList.push(app);
          }
        });
        // down apps
        this.downAppList = res['drownapps'];
        this.downRouteList.length = 0;
        this.downAppList.forEach(app => {
          const key = app.appKey.toLowerCase();
          if (appKeyList.includes(key)) {
            this.downRouteList.push(app);
          }
        });
      });
  }
  /**
   * 计算可创建项目个数（顺便保存用户限制配置）
   */
  private caculateProNumber() {
    // match isOwner
    let createdCount = 0;
    this.ownProjects.forEach(pro => {
      if (pro.CreateorId === String(this.currentUser._id)) {
        pro.IsCreator = true;
        createdCount++;
      }
    });
    const curUserType = String(this.currentUser.UserType);
    this.configService.getConfigWithUserType().subscribe(res => {
      if (res['IsOk']) {
        // first
        localStorage.setItem('userLevelDatas', JSON.stringify(res['Data']));
        res['Data'].forEach(data => {
          if (data.UserType === curUserType) {
            // 无限制用户
            if (curUserType === '2' || curUserType === '100') {
              this.canCreate = true;
              this.canCreateCount = 100; // 假定100为无穷大
              return;
            }
            this.canCreateCount = Number(data.ProjectCount) + 1 - createdCount;
            this.canCreate = this.canCreateCount > 0;
            return;
          }
        });
      }
    });
  }
  /**
   * 设置项目显示模态框
   */
  showDialog() {
    const dialogRef = this.dialog.open(SetDialog, {
      height: '680px',
      width: '800px',
      disableClose: true,
      data: '我是模态框的数据'
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
  /**
   * 改变主题（尚不完善）
   */
  changeTheme() {
    const themeList = ['default-app-theme', 'purple-app-theme', 'candy-app-theme'];
    const selTheme = themeList[Math.floor(Math.random() * themeList.length)];
    console.log('selTheme:' + selTheme);
    this.overlayCon.themeClass = selTheme;
    sessionStorage.removeItem('theme');
    sessionStorage.setItem('theme', this.overlayCon.themeClass);
    this.toastr.info('切换到主题:' + this.overlayCon.themeClass);
  }

}
