import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/RX';
import { MdDialog, MdDialogRef } from '@angular/material';
// taostr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// 导入model
import { ProjectInfo } from '../model/project-info-model';
import { ProjectPhoto } from '../model/project-photo-model';
import { Project } from '../../../shared/model/project-model';
import { ListParams } from '../../../shared/model/listParams-model';
import { MpData } from '../model/mp-model';

import { Title } from '@angular/platform-browser';

// 导入service
import { ProjectInfoService } from '../project-info.service';
import { BaseService } from '../../../shared/service/base.service';
import { LocalStorageService } from '../../../shared/service/localStorage.service';

// dialog
import { addDialog } from '../project-info/addDialog/addDialog';
import { editDialog } from '../project-info/editDialog/editDialog';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css'],
  providers: [ProjectInfoService]
})


export class ProjectInfoComponent implements OnInit {
  private userToken: string;
  private subscription = new Subscription();
  public project = new Project(); // project-model
  public isDisabled: boolean = true; // 是否禁用初始化
  public isShowDialog: boolean = false; // 是否显示添加弹窗
  public projectItems = new Array<ProjectInfo>(); // projectInfo-Model
  // add property
  public propertyName: string;
  public propertyValue: string;
  // 图片类型，0效果图，1进度图
  public type = 0;
  // 传给子组件的属性images
  private slides: any[] = [];
  // 添加弹窗
  public isAddDialog = false;
  // 进度图集的组织数组
  public thumList = new Array<any>();
  // 年月数组
  public year = new Array<any>();
  public month = new Array<any>();

  public activeSlideIndex: number;
  public activeSlideIndex2: number;
  public imgLength;

  private firstDataList = new Array<MpData>();
  private curProject = JSON.parse(localStorage.getItem('currentProject'));

  constructor(
    private toastr: ToastsManager,
    private BaseService: BaseService,
    private projectInfoService: ProjectInfoService,
    private localService: LocalStorageService,
    public dialog: MdDialog,
    private title: Title,
  ) {
    this.title.setTitle('项目概况');
  }

  ngOnInit() {
    this.project = JSON.parse(localStorage.getItem('currentProject')); // 获取当前项目
    // subscript 监听项目变化
    this.subscription = this.localService.getStorage('currentProject').subscribe(res => {
      this.curProject = JSON.parse(res.value);
    });

    this.getProjectInfoSub(this.project._id);
    this.getPhotoSub(this.project._id, this.type);
    this.activeSlideIndex = 0;
    this.activeSlideIndex2 = 0;
  }
  /**
  * 获取工程概况
  * @param id  项目id
  */
  public getProjectInfoSub(id: string) {
    return this.projectInfoService.getProjectProperty(id)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.projectItems.length = 0;
          this.projectItems = res['Data']; // 拿到数据(object集合)
          localStorage.setItem('projectItems', JSON.stringify(this.projectItems));
        }
      });
  }
  /**
  * 新增工程概况属性
  * @param projectId  项目id
  * @param data  修改的数据
  */
  public addPropertySub(projectId: string, data: string) {
    return this.projectInfoService.addProperty(projectId, data)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.toastr.success('工程属性添加成功！');
          this.getProjectInfoSub(projectId);
        }
      });
  }
  /**
  * 确认添加属性
  */
  public onAddProperty() {
    this.isShowDialog = false;
    const addData = [{
      'Name': this.propertyName,
      'Value': this.propertyValue
    }];
    const data = JSON.stringify(addData);
    this.addPropertySub(this.project._id, data);
  }
  /**
  * 显示添加弹窗
  */
  public showDialog() {
    this.isShowDialog = true;
  }
  /**
  * 编辑属性按钮事件
  */
  public editProperty() {
    this.isDisabled = false;
  }
  /**
  * 取消编辑事件
  */
  public onCancle() {
    this.isDisabled = true;
  }
  /**
  * 提交修改事件
  */
  public onSave() {
    this.isDisabled = true;
    const data = JSON.stringify(this.projectItems); // string
    this.updatePropertySub(this.project._id, data);
  }
  /**
  * 修改工程概况属性
  * @param projectId  项目id
  * @param data  修改的数据
  */
  public updatePropertySub(projectId: string, data: string) {
    return this.projectInfoService.updateProperty(projectId, data)
      .subscribe(res => {
        if (res['IsOk']) {
          this.toastr.success('工程信息修改成功！');
          this.isDisabled = true;
        }
      });
  }
  /**
  * 删除工程概况属性
  * @param projectId  项目id
  * @param data  修改的数据
  */
  public deletePropertySub(item) {
    const ids = new Array<any>(); // 转换类型，先new一个数组类型变量，再将需要转换的变量push进数组
    ids.push(item._id);
    const idsString = JSON.stringify(ids);
    const projectId = this.project._id;
    return this.projectInfoService.deleteProperty(projectId, idsString)
      .subscribe(res => {
        if (res['IsOk']) {
          this.toastr.success('工程属性删除成功！');
          this.getProjectInfoSub(projectId);
        }
      });
  }

  /**
  * 获取图集
  * @param id  项目id
  * @param type  图片类型
  */
  public getPhotoSub(projectId: string, type: number) {
    if (type === 1) {
      const listParams = new ListParams();
      listParams.Sort = new Array({ 'Property': 'UploadTime', 'Ascending': true });
      const params = JSON.stringify(listParams);
      return this.projectInfoService.getPhoto(projectId, type, params)
        .subscribe(res => {
          if (res['IsOk']) {

            // 最外层数据集合

            // 每一个月份数据
            const itemData = new Map<string, any>();
            // 图片集合
            // const imgList = new Array<ProjectPhoto>();

            const items = res['Data'];
            if (type === 1) {
              this.firstDataList.length = 0;
              // 遍历原始数据 按所需日期格式 时间的分组
              const timeGroupList = new Array<string>();
              items.forEach(item => {
                const itemTime = new Date(item.UploadTime);
                const itemTimeY = itemTime.getFullYear();
                const itemTimeM = itemTime.getMonth() + 1;
                const timeStr = String(itemTimeY) + '-' + String(itemTimeM);
                if (!timeGroupList.includes(timeStr)) {
                  timeGroupList.push(timeStr);
                }
              });

              let curIndex = 0;
              // 遍历原始数据 获得 按时间分组单项中有多少个图片
              timeGroupList.forEach(tg => {
                const imgList = new Array<ProjectPhoto>();
                items.forEach(item => {
                  const itemTime = new Date(item.UploadTime);
                  const itemTimeY = itemTime.getFullYear();
                  const itemTimeM = itemTime.getMonth() + 1;
                  const timeStr = String(itemTimeY) + '-' + String(itemTimeM);
                  if (tg === timeStr) {
                    item.ImgIndex = curIndex++;
                    imgList.push(item);
                  }
                });
                const mp = new MpData();
                mp.TimeStr = tg;
                mp.ImgList = new Array<ProjectPhoto>();
                mp.ImgList = imgList;

                this.firstDataList.push(mp);
              });
            }
            items.forEach(item => {
              item.UploadTime = this.formatUploadTime(item.UploadTime); // 日期格式
            });
            this.slides.length = 0;
            this.slides = res['Data']; // 拿到type为1的数据
            this.imgLength = this.slides.length; // 图片数组长度
          }
        });
    } else if (type === 0) {
      return this.projectInfoService.getPhoto(projectId, type)
        .subscribe(res => {
          if (res['IsOk']) {
            const items = res['Data'];
            let curIndex = 0;
            items.forEach(item => {
              item.UploadTime = this.formatUploadTime(item.UploadTime); // 日期格式
              item.ImgIndex = curIndex++;
            });
            this.slides.length = 0;
            this.slides = items; // 拿到type为0的数据
            this.imgLength = this.slides.length; // 图片数组长度
          }
        });
    }
  }
  /**
   * 匹配日期格式方法
   * @param date 格式的标准时间
   */
  public formatUploadTime(date: string): any {
    const reg = /^([0-9]{4})[-/\.年]([0-1]?[0-9]{1})[-/\.月]([0-3]?[0-9]{1})[日]?.?([0-2]?[0-9](:[0-6][0-9]){2})?/;
    const t = reg.exec(date);
    if (t && t[0]) {
      if (date) {
        const subReg = /y+(.)M+(.)d+(.)?/i;
        const subArr = subReg.exec(date);
        if (subArr) {
          let resStr = t[1] + subArr[1];
          resStr += t[2] + subArr[2];
          resStr += t[3] + (subArr[3] || '');
          return resStr;
        }
      }
      return t[1] + '年' + t[2] + '月' + t[3] + '日' + '' + t[4];
    }
    return '';
  }

  /**
   * tab切换-筛选效果图或进度图事件（type 0：效果图，type 1：进度图）
   * @param e selectedIndex 当前被激活的tab索引
   */
  public onSelectedIndexChange(e) {
    if (e === 1) { // 若当前tab的索引为1，则进度图tab被激活，则设type为1显示进度图的相关信息
      this.type = 1;
      this.getPhotoSub(this.project._id, e);
    } else { // 否则显示默认的效果图信息
      this.type = 0;
      this.getPhotoSub(this.project._id, e);
    }
  }

  /**
  * 上一张
  * @param i  1为进度图，2为效果图
  */
  public pre(i) {
    if (i === 2) {
      if (this.activeSlideIndex2 !== 0) { // 不是第一个
        this.select2(this.activeSlideIndex2 - 1);
      }
    } else {
      if (this.activeSlideIndex !== 0) { // 不是第一个
        this.select(this.activeSlideIndex - 1);
      }
    }
  }
  /**
  * 下一张
  * @param i  1为进度图。2为效果图
  */
  public next(i) {
    if (i === 2) {
      if (this.activeSlideIndex2 !== (this.slides.length - 1)) { // 不是最后一个
        this.select2(this.activeSlideIndex2 + 1);
      }
    } else {
      if (this.activeSlideIndex !== (this.slides.length - 1)) { // 不是最后一个
        this.select(this.activeSlideIndex + 1);
      }
    }
  }
  /**
  * 进度图--选哪张
  * @param index  选择的图片索引
  */
  public select(index) {
    if (index !== this.activeSlideIndex) {
      const oldImg = this.slides[this.activeSlideIndex];
      const newImg = this.slides[index];
      this.activeSlideIndex = index;
    }
  }
  /**
  * 效果图--选哪张
  * @param index  选择的图片索引
  */
  public select2(index) {
    if (index !== this.activeSlideIndex2) {
      const oldImg = this.slides[this.activeSlideIndex2];
      const newImg = this.slides[index];
      this.activeSlideIndex2 = index;
    }
  }
  /**
  * 删除图集
  * @param id  项目id
  * @param type  图片类型
  */
  public removeSlide(): void {
    let activeIndex;
    if (this.type === 0) {
      activeIndex = this.activeSlideIndex2;
    } else {
      activeIndex = this.activeSlideIndex;
    }
    const toRemove = activeIndex;
    this.slides.splice(toRemove, 1);
    this.toastr.success('删除成功');
    const ids = new Array<string>(); // 转换类型，先new一个数组类型变量，再将需要转换的变量push进数组
    ids.push(this.slides[toRemove]._id); // 根据图片id进行删除操作
    const idsString = JSON.stringify(ids);
    console.log('idsString' + idsString);
    this.projectInfoService.deletePhoto(idsString)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.getPhotoSub(this.project._id, this.type);
        }
      });
  }
  /**
   * 添加图集模态框
   */
  public showAddDialog() {
    const dataParam = {
      'type': this.type
    };
    const dialogRef = this.dialog.open(addDialog, {
      height: '550px',
      width: '600px',
      disableClose: true,
      data: JSON.stringify(dataParam)
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.toastr.info('取消添加');
    });
  }
  /**
  *修改模态框
  */
  public showEditDialog() {
    let activeIndex;
    if (this.type === 0) {
      activeIndex = this.activeSlideIndex2;
    } else {
      activeIndex = this.activeSlideIndex;
    }
    const dataParams = {
      'slides': this.slides,
      'toEdit': activeIndex
    };
    const dialogRef = this.dialog.open(editDialog, {
      height: '450px',
      width: '500px',
      disableClose: true,
      data: JSON.stringify(dataParams)
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.toastr.info('取消修改');
    });
  }
}
