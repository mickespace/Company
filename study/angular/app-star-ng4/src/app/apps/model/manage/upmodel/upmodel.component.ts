/*
 * @Author: zsq
 * @Date: 2017-07-26 11:20:46
 * @Last Modified by: 
 * @Last Modified time: 2017-07-26 19:26:17
 *文件上传弹窗
 */

import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModelService } from '../../model.service';
import { MfileData } from '../../model/model-file-data';

@Component({
  selector: 'app-upmodel',
  templateUrl: './upmodel.component.html',
  styleUrls: ['./upmodel.component.css']
})
export class UpmodelComponent implements OnInit {

  private title: string;
  private upType: string;
  private curId: string;
  private uploadedFiles: any[] = [];

  // 是否执行过上传操作
  private isUpload = false;
  private fileMaxSize: number; // 单个文件大小要根据用户类别限定
  private fileMaxCount: number; // 根据当前已拥有模型个数和用户类别限定
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private modelService: ModelService,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    if (this.data !== undefined) {
      const dataObj = JSON.parse(this.data);
      this.title = dataObj.title;
      this.upType = dataObj.type;
      this.curId = dataObj.curId;
      this.fileMaxCount = dataObj.fileMaxCount;
      this.fileMaxSize = dataObj.fileMaxSize;
    }
  }
  /**
   * 上传事件
   * @param event event对象
   */
  onUpload(event) {
    if (event.files.length > this.fileMaxCount) {
      this.toastr.warning('模型个数超出' + this.fileMaxCount + '，无法上传！', '提示');
    } else {
      if (this.upType === '0') {
        // add
        const data = Array<MfileData>();
        const formData = new FormData();
        this.uploadedFiles.length = 0;
        for (const file of event.files) {
          this.uploadedFiles.push(file);
          // 上传-data
          const mfData = new MfileData();
          mfData.Name = file.name.split('.')[0];
          mfData.ElevationSystem = 0;
          mfData.Description = '';
          data.push(mfData);
          formData.append('add', file, file.name);
        }
        this.addModelFilesSub(this.curId, JSON.stringify(data), formData);
      } else {
        // update
        const file = event.files[0];
        const mfData = new MfileData();
        mfData.Name = file.name.split('.')[0];
        mfData.ElevationSystem = 0;
        mfData.Description = '';
        const formData = new FormData();
        formData.append('update', file, file.name);
        this.updateModelFile(this.curId, JSON.stringify(mfData), formData);
      }
    }
  }
  /**
   * 添加模型sub方法
   * @param parentId 父节点id
   * @param data  文件节点数据集合
   * @param formData 文件数据
   */
  addModelFilesSub(parentId: string, data: string, formData: FormData) {
    this.modelService.addFileNodes(parentId, data, formData).subscribe((res) => {
      if (res['IsOk']) {
        this.toastr.success('添加模型成功！', '结果');
        this.isUpload = true;
      } else {
        this.toastr.error(res['Message'], '结果');
      }
    });
  }
  /**
   * 更新模型sub方法
   * @param id 更新节点id
   * @param data  文件节点数据
   * @param formData 文件数据
   */
  updateModelFile(id: string, data: string, formData: FormData) {
    this.modelService.updateFileNode(id, data, formData).subscribe((res) => {
      if (res['IsOk']) {
        this.toastr.success('更新模型成功！', '结果');
        this.isUpload = true;
      } else {
        this.toastr.error(res['Message'], '结果');
      }
    });
  }
}
