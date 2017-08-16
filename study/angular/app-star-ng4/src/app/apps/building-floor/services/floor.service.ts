import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import base service
import { BaseService } from '../../../shared/service/base.service';
import { AppConfig } from '../../../app.config';
import { Floor } from '../models/floor';
import { ListParams } from '../../../shared/model/listParams-model';
// toastr
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class FloorService {
  public appConfig = new AppConfig();
  private _floors: BehaviorSubject<Floor[]>;
  private _userToken: string;
  private dataStore: {  // 内存“数据库”
    floors: Floor[]
  };

  constructor(public baseService: BaseService, public toastr: ToastsManager, ) {
    this._userToken = localStorage.getItem('userToken');
    this.dataStore = { floors: [] };
    this._floors = new BehaviorSubject<Floor[]>([]);
  }

  private updateStoreAndSubject(floors) {
    this.dataStore.floors = [...floors];
    this._floors.next(Object.assign({}, this.dataStore).floors);
  }

  get floors() {
    return this._floors.asObservable();
  }

  get selectFloor() {
    const selModels = this.dataStore.floors.filter(t => t.IsSelected);
    if (selModels.length !== 1) {
      return null;
    }
    return selModels[0];
  }

  get existFloorCode() {
    const existCode = [];
    this.dataStore.floors.forEach(element => {
      existCode.push(element.Code);
    });
    return existCode;
  }

  /**
   * 获取单体中所有楼层（分页、筛选、排序、映射）
   */
  GetBuildingFloorsAsync(buildingId: string) {
    const listParams = new ListParams();
    const params = new URLSearchParams();
    params.set('userToken', this._userToken);
    params.set('buildingId', buildingId);
    params.set('listParams', JSON.stringify(listParams));
    this.baseService.httpGet(params, '/v1/floor/list')
      .subscribe((res) => {
        if (res['IsOk']) {
          this.updateStoreAndSubject(res['Data']);
        } else {
          this.toastr.info('获取楼层数据失败。' + res['Message']);
        }
      });
  }

  /**
 * 添加楼层
 */
  addFloors(buildingId: string, data: string) {
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'buildingId': buildingId,
      'data': data
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/floor/add')
      .subscribe((res) => {
        if (res['IsOk']) {
          const addDatas = res['Data'] as Floor[];
          this.updateStoreAndSubject(addDatas);
          this._floors.next(Object.assign({}, this.dataStore).floors);
        } else {
          this.toastr.info('添加楼层失败。' + res['Message']);
        }
      });
  }

  /**
   * 删除楼层（批量）
   */
  deleteFloors() {
    const delIds: string[] = [];
    this.dataStore.floors.forEach(t => {
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
    this.baseService.httpPost(params, '/v1/floor/delete')
      .subscribe((res) => {
        if (res['IsOk']) {
          this.dataStore.floors = this.dataStore.floors.filter(t => delIds.indexOf(t._id) === -1);
          this._floors.next(Object.assign({}, this.dataStore).floors);
        } else {
          this.toastr.info('删除楼层失败。' + res['Message']);
        }
      });
  }

  /**
 * 更新楼层
 */
  updateFloors(id: string, data: string) {
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
    this.baseService.httpPost(params, '/v1/floor/update')
      .subscribe((res) => {
        if (res['IsOk']) {
          const index = this.dataStore.floors.findIndex(t => t._id === id);
          if (index === -1) {
            return;
          }
          this.dataStore.floors.filter(t => t._id !== id);
          const newData = res['Data'] as Floor;
          // Todo:添加到集合里  this.dataStore.floors
          this._floors.next(Object.assign({}, this.dataStore).floors);
        } else {
          this.toastr.info('更新楼层失败。' + res['Message']);
        }
      });
  }

  /**
   * 更新轴网文件
   */
  updateAxisFile(floorId: string) {
    if (floorId === null) {
      return;
    }
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'id': floorId
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/floor/update_axis_file')
      .subscribe((res) => {
        if (res['IsOk']) {
          //
        } else {
          this.toastr.info('更新轴网文件失败。' + res['Message']);
        }
      });
  }

  /**
 * 更新轴网文件
 */
  deleteAxisFile(floorId: string) {
    if (floorId === null) {
      return;
    }
    const paramDic: { [key: string]: string } = {
      'userToken': this._userToken,
      'id': floorId
    };
    let params = '?';
    // tslint:disable-next-line:forin
    for (const key in paramDic) {
      params = `${params}${key}=${paramDic[key]}&`;
    }
    this.baseService.httpPost(params, '/v1/floor/delete_axis_file')
      .subscribe((res) => {
        if (res['IsOk']) {
          //
        } else {
          this.toastr.info('删除轴网文件失败。' + res['Message']);
        }
      });
  }

}

