/*
 * @Author: zsq
 * @Date: 2017-07-19 09:22:31
 * @Last Modified by: 
 * @Last Modified time: 2017-07-26 19:17:52
 *模型应用服务
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
// import base service
import { BaseService } from '../../shared/service/base.service';

@Injectable()
export class ModelService {

    private userToken = localStorage.getItem('userToken');
    constructor(private baseService: BaseService) {

    }
    /**
     * 获取项目树列表
     * @param projectId 项目Id
     * @param map 返回映射数组
     */
    public projectTreeList(projectId: string, map?: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('projectId', projectId);
        params.set('map', map);
        return this.baseService.httpGet(params, '/v1/model/project_tree_list');
    }
    /**
     * 添加分组
     * @param parentId 父节点id
     * @param name 分组名称
     * @param description 分组描述，默认为null
     */
    public addGroupNode(parentId: string, name: string, description?: string): Observable<any> {
        const params = '?userToken=' + this.userToken
            + '&parentId=' + parentId
            + '&name=' + name
            + '&description=' + description;
        return this.baseService.httpPost(params, '/v1/model/add_group_node');
    }
    /**
     * 添加文件（批量）
     * @param parentId 父节点id
     * @param data 文件节点数据集合
     * @param formData 文件FormData信息
     */
    public addFileNodes(parentId: string, data: string, formData: FormData): Observable<any> {
        const params = '?userToken=' + this.userToken
            + '&parentId=' + parentId
            + '&data=' + data;
        return this.baseService.httpPostWithFiles(params, '/v1/model/add_file_node', formData);
    }
    /**
     * 更新节点
     * @param id 父节点id
     * @param data 文件节点数据集合
     * @param formData 文件FormData信息
     */
    public updateFileNode(id: string, data: string, formData: FormData): Observable<any> {
        const params = '?userToken=' + this.userToken
            + '&id=' + id
            + '&data=' + data;
        return this.baseService.httpPostWithFiles(params, '/v1/model/update_node', formData);
    }
    /**
     * 删除节点（批量）
     * @param ids 节点id集合
     */
    public deleteNodes(ids: string): Observable<any> {
        const params = '?userToken=' + this.userToken + '&ids=' + ids;
        return this.baseService.httpPost(params, '/v1/model/delete_node');
    }
    // tslint:disable-next-line:eofline
}