import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import base service
import { BaseService } from '../../../shared/service/base.service';
import { AppConfig } from '../../../app.config';
import { Building } from '../models/building';
import { ListParams } from '../../../shared/model/listParams-model';
// toastr
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class BuildingService {
  public appConfig = new AppConfig();
  private _buildings: BehaviorSubject<Building[]>;
  private _userToken: string;
  private _projectId: string;
  private dataStore: {  // 内存“数据库”
    buildings: Building[]
  };

  constructor(public baseService: BaseService, public toastr: ToastsManager, ) {
    this._userToken = localStorage.getItem('userToken');
    this._projectId = localStorage.getItem('projectId');
    this.dataStore = { buildings: [] };
    this._buildings = new BehaviorSubject<Building[]>([]);
  }

  private updateStoreAndSubject(buildings) {
    this.dataStore.buildings = [...buildings];
    this._buildings.next(Object.assign({}, this.dataStore).buildings);
  }

  get buildings() {
    return this._buildings.asObservable();
  }

  get selectBuilding() {
    const selModels = this.dataStore.buildings.filter(t => t.IsSelected);
    if (selModels.length !== 1) {
      return null;
    }
    return selModels[0];
  }

  get existBuildingCode() {
    const existCode = [];
    this.dataStore.buildings.forEach(element => {
      existCode.push(element.Code);
    });
    return existCode;
  }

  // /**
  //  * 获取项目单体楼层树
  //  * @param userToken 用户令牌, @param projectId 项目Id
  //  */
  // GetBuildingFloorsAsync() {
  //   const params = new URLSearchParams();
  //   params.set('userToken', this._userToken);
  //   params.set('projectId', this._projectId);
  //   this.baseService.httpGet(params, '/v1/building/floors')
  //     .subscribe((res) => {
  //       if (res['IsOk']) {
  //         this.updateStoreAndSubject(res['Data']);
  //       } else {
  //         //todo:需要输出错误信息
  //       }
  //     });
  // }

  /**
   * 获取项目所有单体（分页、筛选、排序、映射）
   */
  GetBuildingListAsync() {
    const listParams = new ListParams();
    const params = new URLSearchParams();
    params.set('userToken', this._userToken);
    params.set('projectId', this._projectId);
    params.set('listParams', JSON.stringify(listParams));
    this.baseService.httpGet(params, '/v1/building/list')
      .subscribe((res) => {
        if (res['IsOk']) {
          this.updateStoreAndSubject(res['Data']);
        } else {
          this.toastr.info('获取项目的所有单体数据失败。' + res['Message']);
        }
      });
  }

  /**
 * 添加单体
 */
  addBuildings(data: string) {
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'projectId': this._projectId,
      'data': data
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/building/add')
      .subscribe((res) => {
        if (res['IsOk']) {
          const addDatas = res['Data'] as Building[];
          this.updateStoreAndSubject(addDatas);
          this._buildings.next(Object.assign({}, this.dataStore).buildings);
        } else {
          this.toastr.info('添加单体失败。' + res['Message']);
        }
      });
  }

  /**
   * 删除单体（批量）
   */
  deleteBuildings() {
    const delIds: string[] = [];
    this.dataStore.buildings.forEach(t => {
      if (t.IsSelected !== true) {
        return;
      }
      delIds.push(t._id);
    });
    if (delIds.length === 0) {
      return;
    }
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'ids': JSON.stringify(delIds)
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/building/delete')
      .subscribe((res) => {
        if (res['IsOk']) {
          this.dataStore.buildings = this.dataStore.buildings.filter(t => delIds.indexOf(t._id) === -1);
          this._buildings.next(Object.assign({}, this.dataStore).buildings);
        } else {
          this.toastr.info('删除单体失败。' + res['Message']);
        }
      });
  }

  /**
 * 更新单体
 */
  updateBuildings(id: string, data: string) {
    if (id === null) {
      return;
    }
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'id': id,
      'data': data
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/building/update')
      .subscribe((res) => {
        if (res['IsOk']) {
          const index = this.dataStore.buildings.findIndex(t => t._id === id);
          if (index === -1) {
            return;
          }
          this.dataStore.buildings.filter(t => t._id !== id);
          const newData = res['Data'] as Building;
          newData._id = id;
          this.dataStore.buildings = [...this.dataStore.buildings, newData];
          this._buildings.next(Object.assign({}, this.dataStore).buildings);
        } else {
          this.toastr.info('更新单体失败。' + res['Message']);
        }
      });
  }


}
