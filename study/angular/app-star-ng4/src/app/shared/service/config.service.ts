/**
 * desc:配置信息服务
 * auth:zsq
 * createTime:2017-6-2 09:32:04
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
// import base service
import { BaseService } from './base.service';
// import app config
import { AppConfig } from '../../app.config';
@Injectable()
export class ConfigService {
    public appConfig = new AppConfig();
    private userToken = localStorage.getItem('userToken');
    constructor(public baseService: BaseService) { }
    /**
     * 获取所有行业
     */
    public getIndustrys(): Observable<any> {
        const params = new URLSearchParams();
        return this.baseService.httpGet(params, '/v1/config/industrys');
    }
    /**
     * 获取所有职务
     */
    public getJobs(): Observable<any> {
        const params = new URLSearchParams();
        return this.baseService.httpGet(params, '/v1/config/jobs');
    }
    /**
     * 获取apps配置信息
     * @param localUrl 配置url
     */
    public getLocalAppsConfig(localUrl: string): Observable<any> {
        return this.baseService.httpGetLocal(localUrl);
    }
    /**
     * 获取应用模块接口
     * @param moduleKeys 功能项id集合（string[]，通过JSON.stringify的数据）
     * @param projectId 当前项目Id
     */
    public getAppModulePrivilege(moduleKeys: string, projectId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('moduleKeys', moduleKeys);
        params.set('projectId', projectId);
        return this.baseService.httpGet(params, '/v1/access/privilege');
    }
    /**
     * 获取所有用户类型配置数据
     *result
     *type:1 内测用户
     *type:0 普通用户
     *type:10 高级用户
     *type:100 企业用户
     *type:2 内部用户
     */
    public getConfigWithUserType(): Observable<any> {
        const params = new URLSearchParams();
        return this.baseService.httpGet(params, '/v1/config/userTypes');
    }
    // tslint:disable-next-line:eofline
}