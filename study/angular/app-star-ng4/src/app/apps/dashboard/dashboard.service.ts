/*
 * @Author: zsq 
 * @Date: 2017-06-30 15:08:34 
 * @Last Modified by: 
 * @Last Modified time: 2017-07-03 15:22:43
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { BaseService } from '../../shared/service/base.service';
import { Observable } from 'rxjs/RX';

@Injectable()
export class DashboardService {
  constructor(private baseService: BaseService) { }
  /**
    * 获取仪表板列表
    * @param userToken userToken
    * @param projectId 当前项目Id
    * @param listParams 参数列表
  */
  public getDashboardList(userToken: string, projectId: string, listParams?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('projectId', projectId);
    params.set('listparams', listParams);
    return this.baseService.httpGet(params, '/v1/dashboard/list?userToken=' + userToken);
  }
  /**
   * 添加仪表板
   * @param userToken 令牌
   * @param projectId 项目Id
   * @param name 仪表板名称
   * @param map 返回属性映射数组 (若为null，返回小部件所有信息)
   */
  public addDashboard(userToken: string, projectId: string, name: string, map?: string): Observable<any> {
    const params = '?userToken=' + userToken
      + '&projectId=' + projectId
      + '&name=' + name
      + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/dashboard/add');
  }
  /**
   * 移除仪表板
   * @param userToken 用户令牌
   * @param ids 仪表板id集合
   */
  public removeDashboard(userToken: string, ids: string): Observable<any> {
    const params = '?userToken=' + userToken + '&ids=' + ids;
    return this.baseService.httpPost(params, '/v1/dashboard/delete');
  }
  /**
   * 获取仪表板中的小部件列表
   * @param userToken 用户令牌
   * @param dashboardId 仪表板Id
   * @param listParams 参数列表
   */
  public getWidgetList(userToken: string, dashboardId: string, listParams: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('dashboardId', dashboardId);
    params.set('listParams', listParams);
    return this.baseService.httpGet(params, '/v1/widget/list?userToken=' + userToken);
  }
  /**
   * 仪表板中添加小部件
   * @param userToken 用户令牌
   * @param dashboardId 仪表板id
   * @param data 小部件信息 (具体查看API开发文档)
   * @param map 返回属性映射数组 (若为null，返回小部件所有信息)
   */
  public addWidget(userToken: string, dashboardId: string, data: string, map?: string): Observable<any> {
    const params = '?userToken=' + userToken
      + '&dashboardId=' + dashboardId
      + '&data=' + data
      + '&map=' + map;
    return this.baseService.httpPost(params, '/v1/dashboard/widget/add');
  }
  /**
   * 更新小部件信息
   * @param userToken 用户令牌
   * @param data 欲修改小部件信息
   */
  public updateWidget(userToken: string, data: string): Observable<any> {
    const params = '?userToken=' + userToken + '&data=' + data;
    return this.baseService.httpPost(params, '/v1/dashboard/widget/update');
  }

  /**
   * 移除小部件
   * @param userToken 令牌
   * @param dashboardId 仪表板Id
   * @param ids 欲移除小部件id集合
   */
  public removeWidget(userToken: string, dashboardId: string, ids: string): Observable<any> {
    const params = '?userToken=' + userToken
      + '&dashboardId=' + dashboardId
      + '&ids=' + ids;
    return this.baseService.httpPost(params, '/v1/dashboard/widget/delete');
  }
}
