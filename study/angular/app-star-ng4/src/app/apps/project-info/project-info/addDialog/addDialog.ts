import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
// model
import { ProjectPhoto } from '../../model/project-photo-model';
import { Project } from '../../../../shared/model/project-model';
// 导入service
import { ProjectInfoService } from '../../project-info.service';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'add-dialog',
    templateUrl: './addDialog.html',
    styleUrls: ['./addDialog.css']
})
export class addDialog implements OnInit {
    private isConfirm: string;
    public project = new Project(); // project-model
    public phTime = new Date();
    public phDescription: string;
    // 上传文件
    private uploadedFiles: File;
    // 图集type
    public type: any;

    constructor(
        public toastr: ToastsManager,
        private dialogRef: MdDialogRef<addDialog>,
        private projectInfoService: ProjectInfoService,
        @Inject(MD_DIALOG_DATA) private data: any
    ) { }

    ngOnInit() {
        this.project = JSON.parse(localStorage.getItem('currentProject')); // 获取当前项目
        console.log('project-id=' + this.project._id);
        if (this.data !== undefined) {
            const dataObj = JSON.parse(this.data);
            this.type = dataObj.type; // 将父组件的type存到这里
        }
    }

    /**
    * 确认添加属性
    */
    public onAddPhoto() {
        const addPhoto = [{
            'Description': this.phDescription,
            'UploadTime': this.phTime,
        }];
        const data = JSON.stringify(addPhoto); // string
        const formData = new FormData();
        formData.append('upLoad', this.uploadedFiles, this.uploadedFiles.name);
        console.log('拿到formdata：' + formData);
        this.addPhotoSub(this.project._id, this.type, data, formData);
    }
    /**
      * 新增图集属性
      * @param projectId  项目id
      * @param data  修改的数据
      */
    public addPhotoSub(projectId: string, type: any, data: string, formData: FormData) {
        console.log('进来新增方法了，修改的数据data:' + data);
        console.log('进来新增方法了，传的formData=' + formData);
        console.log('进来新增方法了，传的TYPE=' + type);
        return this.projectInfoService.addPhoto(projectId, this.type, formData, data)
            .subscribe((res) => {
                if (res['IsOk']) {
                    window.location.reload(false);

                }
            });
    }
    /**
    * 选择图片监控事件
    * @param event 事件
    */
    onSelectImg(event) {
        const files = event.files;
        if (files.length > 0) {
            this.uploadedFiles = files[0];
        }
    }
    /**
    * 移除图片监控事件
    * @param event 事件
    */
    onRemoveImg(event) {
        const files = event.files;
        this.uploadedFiles = null;
    }
}