import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA, MdInputModule } from '@angular/material';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// service
import { ProjectService } from '../shared/service/project.service';
import { UserService } from '../shared/service/user.service';
import { BaseService } from '../shared/service/base.service';
// model
import { Project } from '../shared/model/project-model';
import { App } from '../user/app/app-model';
import { CurrentUser } from '../shared/model/user-model';

@Component({
    selector: 'app-set-dialog',
    templateUrl: './set.dialog.html',
    styleUrls: ['./set.dialog.css']
})
export class SetDialog implements OnInit {
    public userToken: string;
    public project = new Project(); // project-model
    public user = new CurrentUser(); // user-model
    // 指令切换值
    public value0: boolean = true;
    public value1: boolean = false;
    public value2: boolean = false;
    public isDisabled: boolean = true; // 是否禁用
    // public isOpen: boolean = false; // 是否开启
    // public isClose: boolean = true; // 是否关闭

    private PublicityList = new Array<number>();
    private AppsList = new Array<any>();
    private apps = new Array<App>();
    private OwnerList = new Array<any>();
    private addornotList = new Array<any>();
    private addornotList2 = new Array<any>();
    public files: any;
    // nameFormControl = new FormControl('', [
    //     Validators.required,
    // ]);
    // public photo: string;
    // public photoFiles: any[] = [];
    // public photoUrl: string;
    // public imageData = new ImageData(550, 250);
    //     public headers = new Headers({'Content-Type': 'multipart/form-data'});
    // public options = new RequestOptions({headers: headers});

    constructor(
        private toastr: ToastsManager,
        private projectService: ProjectService,
        private userService: UserService,
        private baseService: BaseService
    ) {
    }
    ngOnInit() {

        this.project = JSON.parse(localStorage.getItem('currentProject')); // 获取当前项目
        this.user = JSON.parse(localStorage.getItem('currentUser')); // 获取当前Yonghu
        //        this.getUserAppsSub(); // 调用获取应用方法
        const map = new Array('_id', 'Icon', 'Name', 'Publicity', 'OwnerId', 'Description', 'Apps');
        const B = [{ 'key': true, 'value': '开启' }, { 'key': false, 'value': '关闭' }];
        this.addornotList.length = 0;
        this.addornotList.push(B);
        for (let i of this.addornotList) {
            for (let add of i) {
                this.addornotList2.push(add);
            }
        }
        const A = { 'id': this.project.OwnerId, 'name': this.user.RealName };
        this.OwnerList.length = 0;
        this.OwnerList.push(A);
        console.log('project-id:' + this.project._id);
        this.getProjectInfoSub(this.project._id, JSON.stringify(map));
        // this.formData.append('userfile', HTMLInputElement.files[0]);
    }
    change0() {
        this.value0 = true;
        this.value1 = false;
        this.value2 = false;
    }
    change1() {
        this.value0 = false;
        this.value1 = true;
        this.value2 = false;
    }
    change2() {
        this.value0 = false;
        this.value1 = false;
        this.value2 = true;
    }
    /**
    * 获取项目信息
    * @param id  项目id
    * @param map 返回的项目属性映射数组
    */
    public getProjectInfoSub(id: string, map: string) {
        const projectId = this.project._id;
        return this.projectService.getProjectInfo(projectId, map)
            .subscribe((res) => {
                if (res['IsOk']) {
                    this.project = res['Data'];
                    console.log('peoject-item:' + this.project);
                    this.PublicityList.length = 0;
                    this.PublicityList.push(this.project.Publicity);
                    // this.PublicityList.forEach(own => {
                    //     console.log('own:' + own);

                    // });
                    localStorage.setItem('project', JSON.stringify(this.project));
                    this.getUserAppsSub(); // 调用获取应用方法
                }
            });
    }
    /**
    * 获取已购应用
    */
    public getUserAppsSub() {
        this.userService.getUserApps('', '')
            .subscribe((res) => {
                if (res['IsOk']) {
                    const resApps = res['Data'];
                    resApps.forEach(resApp => {
                        const app = new App();
                        app.AppKey = resApp.AppKey;
                        app.AppType = resApp.AppType;
                        app.Icon = resApp.Icon;
                        app.Name = resApp.Name;
                        // 筛选应用状态
                        const isOpen = this.project.Apps.includes(app.AppKey);
                        if (!isOpen) {
                            app.Statue = false;
                        }
                        this.apps.push(app);
                        for (const ap of this.apps) {
                            if (ap.AppType === 0) {
                                this.AppsList.length = 0;
                                this.AppsList.push(ap.AppKey);
                            }
                        }
                    });
                }
            });
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
        this.isDisabled = true;
        const updateProject = {
            'Name': this.project.Name,
            'Description': this.project.Description,
            'Publicity': this.project.Publicity,
            'OwnerId': this.project.OwnerId
        };
        const data = JSON.stringify(updateProject); // string
        if (this.files.length > 0) {
            const file: File = this.files[0];
            const formData = new FormData();
            formData.append('upLoad', file, file.name);
            this.updateProjectInfoSub(this.project._id, data, formData);
        } else {
            this.updateProjectInfoSub(this.project._id, data);
        }
    }
    /**
    * cancle
    */
    onCancle() {
        this.isDisabled = true;
    }
    public onChange(event, a) {
        if (a.key) {
            this.onOpen();
        } else {
            this.onClose();
        }
    }
    /**
    * 开启应用
    */
    public onOpen() {
        const openApp = this.AppsList;
        const data = JSON.stringify(openApp);
        this.addAppSub(this.project._id, data);
    }
    /**
    * 禁用应用
    */
    public onClose() {
        const openApp = this.AppsList;
        const data = JSON.stringify(openApp);
        this.deleteAppSub(this.project._id, data);
    }
    /**
    * 添加项目下的应用方法
    * @param id 项目id
    * @param data 返回待添加的应用标识集合（apptype为0的普通应用）
    */
    public addAppSub(id: string, data: string) {
        return this.projectService.addApp(id, data)
            .subscribe((res) => {
                if (res['IsOk']) {
                    const resApps = res['Data'];
                    this.toastr.success('开启应用成功');
                }
            });
    }

    /**
    * 删除项目下的应用方法
    * @param id 项目id
    * @param data 返回待添加的应用标识集合（apptype为0的普通应用）
    */
    public deleteAppSub(id: string, data: string) {
        return this.projectService.deleteApp(id, data)
            .subscribe((res) => {
                if (res['IsOk']) {
                    const resApps = res['Data'];
                    this.toastr.success('禁用应用成功');
                }
            });
    }
    public onPhotoUpload(event) {
        this.files = event.target.files;
    }
    /**
    *更新项目信息
    * @param data 更新的用户信息
    */
    public updateProjectInfoSub(id: string, data: string, Icon?: FormData) {
        console.log('Icon:' + Icon);
        const projectId = this.project._id;
        if (Icon != null) {
            console.log('Icon is exsit:' + Icon);
            return this.projectService.updateProjectInfo(projectId, data, Icon)
                .subscribe((res) => {
                    if (res['IsOk']) {
                        this.toastr.success('项目信息修改成功');
                        this.isDisabled = true;
                        // 同步currentProject
                        localStorage.removeItem('currentProject');
                        localStorage.setItem('currentProject', JSON.stringify(this.project));
                        window.location.reload(false);
                    } else {
                        this.toastr.error('项目信息修改失败');
                    }
                });
        } else {
            return this.projectService.updateProjectInfo(projectId, data)
                .subscribe((res) => {
                    if (res['IsOk']) {
                        this.toastr.success('项目信息修改成功');
                        this.isDisabled = true;
                        // 同步currentProject
                        localStorage.removeItem('currentProject');
                        localStorage.setItem('currentProject', JSON.stringify(this.project));
                        window.location.reload(false);
                    } else {
                        this.toastr.error('项目信息修改失败');
                    }
                });
        }
    }
    /**
    * 确认删除项目弹框
    */
    public onConfirm() {
        if (confirm('确认删除本项目？')) {
            this.deletePro();
        } else {
            return false;
        }
    }
    /**
    * 删除项目
    */
    public deletePro() {
        const ids = new Array<string>(); // 转换类型，先new一个数组类型变量，再将需要转换的变量push进数组
        ids.push(this.project._id);
        const idsString = JSON.stringify(ids); // 转为string传入服务器
        return this.projectService.deleteProject(idsString)
            .subscribe((res) => {
                if (res['IsOk']) {
                    this.toastr.success('删除成功');
                    localStorage.removeItem('currentProject');
                    localStorage.setItem('currentProject', JSON.stringify(this.project));
                    window.location.reload(false);
                }
            });
    }
}
