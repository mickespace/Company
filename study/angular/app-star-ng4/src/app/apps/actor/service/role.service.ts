/*
 * @Author: zsq 
 * @Date: 2017-08-10 20:29:48 
 * @Last Modified by:   zsq 
 * @Last Modified time: 2017-08-10 20:29:48 
 */

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from '../../../shared/service/base.service';

@Injectable()
export class RoleService {

  private userToken = localStorage.getItem('userToken');
  constructor(
    private baseService: BaseService
  ) { }
  /**
   * 获取项目所有角色
   * @param projectId 项目Id
   * @param listParams 请求参数params
   */
  public getRoleList(projectId: string, listParams?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('projectId', projectId);
    params.set('listParams', listParams);
    return this.baseService.httpGet(params, '/v1/role/list');
  }
  /**
 * 获取角色基本信息
 * @param id 角色id
 * @param map 返回属性映射数组[数组转化]
 */
  public getRoleInfo(id: string, map?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    params.set('map', map);
    return this.baseService.httpGet(params, '/v1/role/info');
  }
  /**
   * 修改角色信息
   * @param id 角色id
   * @param name 角色名称
   * @param description 角色描述
   */
  public updateRoleInfo(id: string, name?: string, description?: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&name=' + name + '&description=' + description;
    return this.baseService.httpPost(params, '/v1/role/update');
  }
  /**
   * 创建角色
   * @param data 角色信息
   * @param map 返回的属性映射数组
   */
  public createRole(data: string, map?: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&data=' + data + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/role/create');
  }
  /**
   * 删除角色
   * @param ids 待删除角色id集合
   */
  public deleteRoles(ids: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&ids=' + ids;
    return this.baseService.httpPost(params, '/v1/role/delete');
  }
  /**
   * 获取本角色所有成员
   * @param id 角色id
   */
  public getMembersForRole(id: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    return this.baseService.httpGet(params, '/v1/role/members');
  }
  /**
   * 为角色添加成员
   * @param id 角色id
   * @param memberIds 待添加成员id集合
   * @param map 返回的属性映射数组
   */
  public addMembersForRole(id: string, memberIds: string, map?: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&memberIds=' + memberIds + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/role/add_members');
  }
  /**
   * 从角色中移除成员
   * @param id 角色id
   * @param memberIds 待删除的成员id集合
   */
  public removeMembersFromRole(id: string, memberIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&memberIds=' + memberIds;
    return this.baseService.httpPost(params, '/v1/role/delete_members');
  }
}
