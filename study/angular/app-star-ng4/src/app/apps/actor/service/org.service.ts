/*
 * @Author: zsq 
 * @Date: 2017-08-10 20:29:27 
 * @Last Modified by:   zsq 
 * @Last Modified time: 2017-08-10 20:29:27 
 */

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from '../../../shared/service/base.service';

@Injectable()
export class OrgService {

  private userToken = localStorage.getItem('userToken');
  constructor(
    private baseService: BaseService
  ) { }

  /**
   * 获取项目所有组织
   * @param projectId 项目Id
   * @param listParams 请求参数params
   */
  public getOrgList(projectId: string, listParams?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('projectId', projectId);
    params.set('listParams', listParams);
    return this.baseService.httpGet(params, '/v1/org/list');
  }
  /**
   * 获取组织基本信息
   * @param id 组织id
   * @param map 返回属性映射数组[数组转化]
   */
  public getOrgInfo(id: string, map?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    params.set('map', map);
    return this.baseService.httpGet(params, '/v1/org/info');
  }
  /**
   * 修改组织信息
   * @param data 组织信息[object 转化]
   */
  public updateOrgInfo(data: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&data=' + data;
    return this.baseService.httpPost(params, '/v1/org/update');
  }
  /**
   * 创建组织
   * @param data 组织信息[object 转化]
   * @param map 返回属性映射数组
   */
  public createOrg(data: string, map?: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&data=' + data + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/org/create');
  }
  /**
   * 删除组织
   * @param ids 待删除组织id集合
   */
  public deleteOrgs(ids: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&ids=' + ids;
    return this.baseService.httpPost(params, '/v1/org/delete');
  }
  /**
 * 获取组织所属角色集合
 * @param id 组织id
 */
  public getOrgRoles(id: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    return this.baseService.httpGet(params, '/v1/org/roles');
  }
  /**
     * 为组织批量添加角色
     * @param id 组织id
     * @param roleIds 待添加角色id集合[数组转化]
     */
  public addRolesForOrg(id: string, roleIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&roleIds=' + roleIds;
    return this.baseService.httpPost(params, '/v1/org/add_roles');
  }
  /**
 * 批量移除组织角色
 * @param id 组织id
 * @param roleIds 带移除角色id集合[数组转化]
 */
  public deleteRolesFromOrg(id: string, roleIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&roleIds=' + roleIds;
    return this.baseService.httpPost(params, '/v1/org/delete_roles');
  }
  /**
   * 获取组织所有成员
   * @param id 组织id
   */
  public getOrgMembers(id: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    return this.baseService.httpGet(params, '/v1/org/members');
  }
  /**
   * 为组织添加成员
   * @param id 组织id
   * @param memberIds 待添加的成员Id集合
   * @param map 返回的属性映射数组
   */
  public addMembersForOrg(id: string, memberIds: string, map?: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&memberIds=' + memberIds + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/org/add_members');
  }
  /**
   * 从组织中移除成员
   * @param id 组织id
   * @param memberIds 带移除成员id集合
   */
  public removeMembersFromOrg(id: string, memberIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&memberIds=' + memberIds;
    return this.baseService.httpPost(params, '/v1/org/delete_members');
  }
}
