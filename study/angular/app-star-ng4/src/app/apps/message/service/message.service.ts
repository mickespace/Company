/**
 * desc:消息服务
 * auth:hll
 * createTime:2017-6-30 10:44:58
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
// import base service
import { BaseService } from '../../../shared/service/base.service';
// import app config
import { AppConfig } from '../../../shared/model/apps-config-model';

@Injectable()
export class MessageService {
    public appConfig = new AppConfig();
    constructor(public baseService: BaseService) { }
    /**
     * 获取用户的消息
     * @param userToken 用户令牌, listParams 集合的筛选、分页、排序、映射参数
     */
    public GetUserNoticeInfoListAsync(userToken: string, state: number, projectId: string, listParams: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('state', state.toString());
        params.set('projectId', projectId);
        params.set('listparams', listParams);
        return this.baseService.httpGet(params, '/v1/notice/list?userToken=' + userToken);
    }

    /**
     * 获取消息的数量
     * @param userToken 用户令牌
     */
    public GetNoticesCountAsync(userToken: string, state: number, projectId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('state', state.toString());
        params.set('projectId', projectId);
        return this.baseService.httpGet(params, '/v1/notice/count?userToken=' + userToken);
    }

    /**
     * 标记已读消息
     * @param userToken 用户令牌, ids 标记已读的消息Id集合
     */
    public NoticesMarkReadAsync(userToken: string, ids: string[]): Observable<any> {
        const idsJson = JSON.stringify(ids);
        const params = '?userToken=' + userToken + '&ids=' + idsJson;
        return this.baseService.httpPost(params, '/v1/notice/mark_read');
    }

    /**
     * 删除消息
     * @param userToken 用户令牌, ids 删除的消息Id集合
     */
    public DeleteNoticesMarkAsync(userToken: string, ids: string[]): Observable<any> {
        const idsJson = JSON.stringify(ids);
        const params = '?userToken=' + userToken + '&ids=' + idsJson;
        return this.baseService.httpPost(params, '/v1/notice/mark_delete');
    }
}
