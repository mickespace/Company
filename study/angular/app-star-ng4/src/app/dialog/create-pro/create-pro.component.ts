import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ProjectService } from '../../shared/service/project.service';

@Component({
  selector: 'app-create-pro',
  templateUrl: './create-pro.component.html',
  styleUrls: ['./create-pro.component.css']
})
export class CreateProComponent implements OnInit {

  private isCreate = false;
  // 封面大小
  private fileMaxSize = 5242880;
  private imgFile: File;
  private projectName: string;
  private projectDesc: string;
  constructor(
    private proService: ProjectService,
    private toast: ToastsManager,
    private vcf: ViewContainerRef
  ) {
    toast.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
  }

  /**
   * 选择图片监控事件
   * @param event 事件
   */
  onSelectImg(event) {
    const files = event.files;
    if (files.length > 0) {
      this.imgFile = files[0];
    }
  }
  /**
   * 移除图片监控事件
   * @param event 事件
   */
  onRemoveImg(event) {
    const files = event.files;
    if (!files) {
      this.imgFile = null;
    }
  }
  /**
   * 创建项目
   */
  onCreate() {
    if (this.projectDesc === undefined) {
      this.projectDesc = '';
    }
    const data = {
      'Name': this.projectName,
      'Description': this.projectDesc
    };
    const formData = new FormData();
    formData.append('img', this.imgFile, this.imgFile.name);
    this.proService.createProject(JSON.stringify(data), formData).subscribe(res => {
      if (res['IsOk']) {
        this.toast.success('项目创建成功！');
        this.isCreate = true;
        this.imgFile = null;
        this.projectName = '';
        this.projectDesc = '';
      } else {
        this.toast.error(res['Message'], '错误提示');
      }
    });
  }
}
