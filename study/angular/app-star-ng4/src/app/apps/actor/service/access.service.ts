/*
 * @Author: zsq
 * @Date: 2017-08-11 11:46:12
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-11 13:13:33
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from '../../../shared/service/base.service';

@Injectable()
export class AccessService {

  private userToken = localStorage.getItem('userToken');
  constructor(
    private baseService: BaseService
  ) { }

  /**
   * 获取所有权限列表根据不同类型
   * @param actorType 参与者类型：0-成员，1-组织，2-角色
   * @param actorId 参与者Id
   * @param listParams 集合的筛选、分页、排序、映射参数
   */
  public getAccessList(actorType: string, actorId: string, listParams?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('actorType', actorType);
    params.set('actorId', actorId);
    params.set('listParams', listParams);
    return this.baseService.httpGet(params, '/v1/access/list');
  }
  /**
   * 获取模块功能权限
   * @param moduleKey 功能项id
   * @param actorType 参与者类型：0-成员，1-组织，2-角色
   * @param actorId 参与者Id
   */
  public getModuleAccessInfo(moduleKey: string, actorType: string, actorId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('moduleKey', moduleKey);
    params.set('actorType', actorType);
    params.set('actorId', actorId);
    return this.baseService.httpGet(params, '/v1/access/info');
  }
  /**
   * 获取模块功能实际权限
   * @param moduleKeys 功能项id集合
   * @param actorType 参与者类型：0-成员，1-组织，2-角色
   * @param actorId 参与者Id
   */
  public getRealModuleAccessInfo(moduleKeys: string, actorType: string, actorId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('moduleKeys', moduleKeys);
    params.set('actorType', actorType);
    params.set('actorId', actorId);
    return this.baseService.httpGet(params, '/v1/access/real_access');
  }
  /**
   * 获取当前用户对功能项的权限
   * @param moduleKeys 功能项id集合
   * @param projectId 项目id
   */
  public getModuleAccessCurUser(moduleKeys: string, projectId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('moduleKeys', moduleKeys);
    params.set('projectId', projectId);
    return this.baseService.httpGet(params, '/v1/access/privilege');
  }
  /**
   * 设置功能项权限
   * @param actorType 参与者类型：0-成员，1-组织，2-角色
   * @param actorId 参与者Id
   * @param data 权限信息
   */
  public setModuleAccess(actorType: string, actorId: string, data: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&actorType=' + actorType + '&actorId=' + actorId + '&data=' + data;
    return this.baseService.httpPost(params, '/v1/access/set');
  }
  /**
   * 获取权限来源
   * @param actorType 参与者类型：0-成员，1-组织，2-角色
   * @param actorId 参与者Id
   * @param moduleKey 功能模块Id
   */
  public getAccessSource(actorType: string, actorId: string, moduleKey: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('actorType', actorType);
    params.set('actorId', actorId);
    params.set('moduleKey', moduleKey);
    return this.baseService.httpGet(params, '/v1/access/source');
  }
}
