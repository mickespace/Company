/**
 * desc:项目服务
 * auth:zsq
 * createTime:2017-6-6 18:26:25
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
// import base service
import { BaseService } from './base.service';
// import app config
import { AppConfig } from '../../app.config';

@Injectable()
export class ProjectService {
    public appConfig = new AppConfig();
    private _userToken: string;
    private _projectId: string;
    constructor(
        public baseService: BaseService
    ) {
        this._userToken = localStorage.getItem('userToken');
        this._projectId = localStorage.getItem('projectId');
    }
    /**
    *  获取项目信息
    * @param userToken 令牌
    * @param id id
    * @param map 映射数组
    */
    public getProjectInfo(id: string, map: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('id', id);
        params.set('map', map);
        return this.baseService.httpGet(params, '/v1/project/info?userToken=' + this._userToken);
    }
    /**
     * 获取用户拥有项目
     * @param userToken userToken
     */
    public getProjectList(listParams: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('listparams', listParams);
        return this.baseService.httpGet(params, '/v1/project/list?userToken=' + this._userToken);
    }
    /**
     * 创建项目
     * @param data 项目信息集合
     * @param formData 项目图标FormData信息
     * @param map 返回属性映射数组
     */
    public createProject(data: string, formData: FormData, map?: string): Observable<any> {
        const params = '?userToken=' + this._userToken + '&data=' + data + '&map=' + map;
        return this.baseService.httpPostWithFiles(params, '/v1/project/create', formData);
    }
    /**
     * 删除项目
     * @param Ids 项目id集合
     */
    public deleteProject(Ids: string) {
        const params = '?userToken=' + this._userToken + '&Ids=' + Ids;
        return this.baseService.httpPost(params, '/v1/project/delete');
    }
    /**
     *  更新项目信息
     ** @param id 项目id
     *  @param data 修改的用户信息
     ** @param Icon 修改的图标
     */
    public updateProjectInfo(id: string, data: string, Icon?: FormData): Observable<any> {
        const params = '?userToken=' + this._userToken + '&data=' + data + '&Id=' + id;
        if (Icon != null) {
            const formData: FormData = Icon;
            return this.baseService.httpPostWithFiles(params, '/v1/project/update', formData);
        } else {
            return this.baseService.httpPost(params, '/v1/project/update');
        }
    }
    /**
     *  添加项目信息
     ** @param id 项目id
     *  @param data 修改的用户信息
     */
    public addApp(id: string, data: string): Observable<any> {
        const params = '?userToken=' + this._userToken + '&Id=' + id + '&AppKeys=' + data;
        return this.baseService.httpPost(params, '/v1/project/add_apps');
    }
    /**
    *  删除项目信息
    ** @param id 项目id
    *  @param data 修改的用户信息
    */
    public deleteApp(id: string, data: string): Observable<any> {
        const params = '?userToken=' + this._userToken + '&Id=' + id + '&AppKeys=' + data;
        return this.baseService.httpPost(params, '/v1/project/delete_apps');
    }
}