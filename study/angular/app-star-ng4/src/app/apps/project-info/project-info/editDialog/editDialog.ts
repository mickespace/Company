import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
// model
import { ProjectPhoto } from '../../model/project-photo-model';
// 导入service
import { ProjectInfoService } from '../../project-info.service';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'edit-dialog',
    templateUrl: './editDialog.html',
    styleUrls: ['./editDialog.css']
})
export class editDialog implements OnInit {
    private slides: any;
    private activeIndex: any;
    private updateItem: any;

    constructor(
        private projectInfoService: ProjectInfoService,
        private toastr: ToastsManager,
        @Inject(MD_DIALOG_DATA) private data: any
    ) { }

    ngOnInit() {
        if (this.data !== undefined) {
            const dataObj = JSON.parse(this.data);
            this.slides = dataObj.slides; // obj
            this.activeIndex = dataObj.toEdit;
            this.updateItem = this.slides[this.activeIndex]; // 获取索引图片对象
            this.updateItem.UploadTime = this.formatUploadTime(String(this.updateItem.UploadTime));
            this.updateItem.UploadTime = new Date(Date.parse(this.updateItem.UploadTime)); // 转换日期格式为Date（）
        }
    }

    public onSave() {
        const updatePhoto = {
            // 'UploadTime': '2017/08/01 12:01',
            'UploadTime': this.updateItem.UploadTime,
            'Description': this.updateItem.Description
        };
        const data = JSON.stringify(updatePhoto);
        const id = this.updateItem._id;
        this.editPhotoSub(id, data);
    }
    public editPhotoSub(id: string, data: string) {
        return this.projectInfoService.editPhoto(id, data)
            .subscribe((res) => {
                if (res['IsOk']) {
                    this.toastr.success('修改成功');
                    window.location.reload(false);
                }
            });
    }
    public formatUploadTime(date: string) {
        const date1 = date.replace(/年/, '/');
        const date2 = date1.replace(/月/, '/');
        const date3 = date2.replace(/日/, ' ');
        return date3;
    }
}