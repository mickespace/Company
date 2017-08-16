/*
 * @Author: hxj 
 * @Date: 2017-07-27 10:43:12 
 * @Last Modified by: hxj
 * @Last Modified time: 2017-08-11 16:00:27
 * 项目概况服务
 */

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import base service
import { BaseService } from '../../shared/service/base.service';
// model
import { ProjectPhoto } from './model/project-photo-model';

@Injectable()
export class ProjectInfoService {

    private userToken: string;
    private projectId: string;

    // 声明子组件的_slides参数
    private _slides: any;
    private dataStore: {  // 内存“数据库”
        slides: ProjectPhoto[],
        type: number
    };
    public _type: any; // 传递给子组件的参数

    constructor(private baseService: BaseService) {
        this.userToken = localStorage.getItem('userToken');
        this.projectId = localStorage.getItem('projectId');
    }

    /**
     * 获取工程概况
     * @param projectId 项目Id
     */
    public getProjectProperty(projectId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('projectId', projectId);
        return this.baseService.httpGet(params, '/v1/project/property/info');
    }
    /**
     * 修改工程概况
     * @param projectId 项目Id
     */
    public updateProperty(projectId: string, data: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&data=' + data + '&projectId=' + projectId;
        return this.baseService.httpPost(params, '/v1/project/property/update');
    }
    /**
     * 删除工程概况
     * @param projectId 项目Id
     * @param Ids 属性Id集合
     */
    public deleteProperty(projectId: string, Ids: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&Ids=' + Ids + '&projectId=' + projectId;
        return this.baseService.httpPost(params, '/v1/project/property/delete');
    }
    /**
     * 新增工程概况
     * @param projectId 项目Id
     * @param Ids 属性Id集合
     */
    public addProperty(projectId: string, data: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&data=' + data + '&projectId=' + projectId;
        return this.baseService.httpPost(params, '/v1/project/property/add');
    }
    /**
    * 获取工程图集
    * @param projectId 项目Id
    */
    public getPhoto(projectId: string, type: any, listParams?: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('ProjectId', projectId);
        params.set('Type', type);
        params.set('ListParams', listParams);
        return this.baseService.httpGet(params, '/v1/project/photo/list');
    }
    /**
    * 新增工程图
    * @param projectId 项目Id
    * @param type 图片类型
    * @param files 图片文件流
    * @param data 增加的图片信息
    */
    public addPhoto(projectId: string, type: number, files: FormData, data?: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&type=' + type + '&projectId=' + projectId + '&files=' + files + '&data=' + data;
        return this.baseService.httpPostWithFiles(params, '/v1/project/photo/add', files);
    }
    /**
    * 修改工程图
    * @param id 图片Id
    * @param data 修改的图片信息
    */
    public editPhoto(id: string, data: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&Id=' + id + '&data=' + data;
        return this.baseService.httpPost(params, '/v1/project/photo/update');
    }
    /**
    * 删除工程图
    * @param id 图片Id
    */
    public deletePhoto(ids: string): Observable<any> {
        const userToken = localStorage.getItem('userToken');
        const params = '?userToken=' + userToken + '&Ids=' + ids;
        return this.baseService.httpPost(params, '/v1/project/photo/delete');
    }
}