/*
 * @Author: zsq
 * @Date: 2017-08-10 19:29:04
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-10 20:14:24
 *成员 服务
 */

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BaseService } from '../../../shared/service/base.service';

@Injectable()
export class MemberService {

  private userToken = localStorage.getItem('userToken');
  constructor(private baseService: BaseService) { }
  /**
   * 获取项目所有成员
   * @param projectId 项目Id
   * @param listParams 请求参数params
   */
  public getMemberList(projectId: string, listParams?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('projectId', projectId);
    params.set('listParams', listParams);
    return this.baseService.httpGet(params, '/v1/member/list');
  }
  /**
   * 获取成员基本信息
   * @param id 成员id
   * @param map 返回属性映射数组[数组转化]
   */
  public getMemberInfo(id: string, map?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    params.set('map', map);
    return this.baseService.httpGet(params, '/v1/member/info');
  }
  /**
   * 从项目中移除成员
   * @param memberIds 成员id集合[数组转化]
   */
  public removeMembers(memberIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&memberIds=' + memberIds;
    return this.baseService.httpPost(params, '/v1/member/delete');
  }
  /**
   * 批量邀请成员
   * @param projectId 项目id
   * @param data 邀请邮箱/手机(可混合)集合[数组转化]
   */
  public inviteMembers(projectId: string, data: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&projectId=' + projectId + '&data=' + data;
    return this.baseService.httpPost(params, '/v1/member/invite');
  }
  /**
   * 获取邀请码
   * @param projectId 项目id
   */
  public getInviteCode(projectId: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('projectId', projectId);
    return this.baseService.httpGet(params, '/v1/member/invite_code');
  }
  /**
   * 获取成员所属角色集合
   * @param id 成员id
   */
  public getMemberRoles(id: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    return this.baseService.httpGet(params, '/v1/member/roles');
  }
  /**
   * 为成员批量添加角色
   * @param id 成员id
   * @param roleIds 待添加角色id集合[数组转化]
   */
  public addRolesForMem(id: string, roleIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&roleIds=' + roleIds;
    return this.baseService.httpPost(params, '/v1/member/add_roles');
  }
  /**
 * 批量移除成员角色
 * @param id 成员id
 * @param roleIds 带移除角色id集合[数组转化]
 */
  public deleteRolesFromMem(id: string, roleIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&roleIds=' + roleIds;
    return this.baseService.httpPost(params, '/v1/member/delete_roles');
  }

  /**
     * 获取成员所属组织集合
     * @param id 成员id
     */
  public getMemberOrgs(id: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('userToken', this.userToken);
    params.set('id', id);
    return this.baseService.httpGet(params, '/v1/member/orgs');
  }
  /**
   * 为成员批量添加组织
   * @param id 成员id
   * @param orgIds 待添加组织id集合[数组转化]
   */
  public addOrgsForMem(id: string, orgIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&orgIds=' + orgIds;
    return this.baseService.httpPost(params, '/v1/member/add_orgs');
  }
  /**
 * 从成员中移除组织
 * @param id 成员id
 * @param orgIds 待移除组织id集合[数组转化]
 */
  public removeOrgsFromMem(id: string, orgIds: string): Observable<any> {
    const params = '?userToken=' + this.userToken + '&id=' + id + '&orgIds=' + orgIds;
    return this.baseService.httpPost(params, '/v1/member/delete_orgs');
  }

}
