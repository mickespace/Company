import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModelService } from '../../model.service';
import { MfileData } from '../../model/model-file-data';

@Component({
  selector: 'app-update-text',
  templateUrl: './update-text.component.html',
  styleUrls: ['./update-text.component.css']
})
export class UpdateTextComponent implements OnInit {

  private nodeId: string;
  private ElevationSource = [
    { value: 0, viewValue: '建筑体系' },
    { value: 1, viewValue: '结构体系' }
  ];
  private mfileData = new MfileData();
  private isModel = false;
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
      this.nodeId = dataObj.id;
      this.mfileData.Name = dataObj.Name;
      console.log('eleva:' + dataObj.ElevationSystem);
      if (dataObj.ElevationSystem !== undefined) {
        this.mfileData.ElevationSystem = dataObj.ElevationSystem;
        this.isModel = true;
      }
      this.mfileData.Description = dataObj.Description;
    }
  }
  /**
   * 保存
   */
  onSave() {
    console.log('标高：' + this.mfileData.ElevationSystem);
    this.modelService.updateFileNode(this.nodeId, JSON.stringify(this.mfileData), null).subscribe(res => {
      if (res['IsOk']) {
        this.toastr.success('编辑信息成功！');
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
}
