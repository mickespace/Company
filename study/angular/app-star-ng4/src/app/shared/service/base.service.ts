/**
 * desc:基础服务
 * auth:zsq
 * createTime:2017-6-1 18:06:59
 */
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import app config
import { AppConfig } from '../../app.config';

@Injectable()
export class BaseService {
    public appConfig: AppConfig = new AppConfig();
    public baseAddress = this.appConfig.BaseApiAddress;
    constructor(public http: Http) { }

    /**
     * http get
     * @param params 参数
     * @param url 地址（不包含基地址）
     */
    public httpGet(params: URLSearchParams, url: string) {
        return this.http
            .get(this.baseAddress + url, { search: params })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    /**
     * http post
     * @param params 参数
     * @param url 地址（不包含基地址）
     */
    public httpPost(params: string, url: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseAddress + url + params, options)
            .map((res) => res.json())
            .catch(this.handleError);
    }
    /**
     * http post with files
     * @param params 参数
     * @param url 地址（不包含基地址）
     * @param formData FormData对象
     *forexample：
     *const fileList = event.target.files;
     *const file=fileList[0]
     *const formData =new FormData();
     *formData.append('',file,file.name);
     */
    public httpPostWithFiles(params: string, url: string, formData: FormData) {
        const headers = new Headers();
        headers.append('Enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseAddress + url + params, formData, options)
            .map((res) => res.json())
            .catch(this.handleError);
    }
    /**
     * http get local json
     * @param url 地址
     */
    public httpGetLocal(url: string) {
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    /**
     * 错误处理
     * @param error response
     */
    public handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}