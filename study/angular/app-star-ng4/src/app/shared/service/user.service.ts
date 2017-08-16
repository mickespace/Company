/**
 * desc:用户服务
 * auth:zsq
 * createTime:2017-6-1 13:54:21
 */
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/RX';
// import base service
import { BaseService } from './base.service';
// import app config
import { AppConfig } from '../../app.config';

@Injectable()
export class UserService {
    public appConfig = new AppConfig();
    public userToken = localStorage.getItem('userToken');
    constructor(public baseService: BaseService) { }
    /**
   * 用户登录服务
   * @param appKey AppKey
   * @param userName 用户名（邮箱或手机）
   * @param password 密码
   */
    public login(userName: string, password: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('appKey', this.appConfig.AppStarKey);
        params.set('username', userName);
        params.set('password', password);
        return this.baseService.httpGet(params, '/v1/user/login');
    }
    /**
     * 获取userToken
     * @param tokenKey tokenKey
     */
    public getUserToken(tokenKey: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('appKey', this.appConfig.AppStarKey);
        params.set('tokenKey', tokenKey);
        return this.baseService.httpGet(params, '/v1/user/token');
    }

    /**
     * 验证用户名是否存在
     * @param userName 用户名
     */
    public isUserExist(userName: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('appKey', this.appConfig.AppStarKey);
        params.set('userName', userName);
        return this.baseService.httpGet(params, '/v1/user/exist');
    }
    /**
     * send code 注册专用
     * @param userName 用户名
     */
    public sendCodeForRegister(userName: string): Observable<any> {
        const params = '?appKey=' + this.appConfig.AppStarKey + '&userName=' + userName;
        return this.baseService.httpPost(params, '/v1/user/register/verify_code');
    }
    /**
     * 注册用户
     * @param password 密码
     * @param verifyCode 验证码
     * @param email 邮箱
     * @param phoneNumber 手机号
     * @param realName 真是姓名
     * @param inviteCode 邀请码
     * @param industry 行业
     * @param companyName 公司名称
     */
    public register(
        password: string,
        verifyCode: string,
        email: string,
        phoneNumber: string,
        realName: string,
        inviteCode: string,
        industry: string,
        companyName: string,
        jobPosition: string
    ): Observable<any> {
        const params = '?appKey=' + this.appConfig.AppStarKey
            + '&password=' + password
            + '&verifyCode=' + verifyCode
            + '&email=' + email
            + '&phoneNumber=' + phoneNumber
            + '&realName=' + realName
            + '&inviteCode=' + inviteCode
            + '&industry=' + industry
            + '&companyName=' + companyName
            + '&jobPosition=' + jobPosition;
        return this.baseService.httpPost(params, '/v1/user/register');
    }
    /**
     * send verify code api 绑定专用
     * @param email 邮箱
     * @param phoneNumber 手机号码
     */
    public sendCodeForBinding(email: string, phoneNumber: string): Observable<any> {
        const appKey = this.appConfig.AppStarKey;
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('appKey', appKey);
        params.set('email', email);
        params.set('phoneNumber', phoneNumber);
        return this.baseService.httpGet(params, '/v1/user/verify_code/send');
    }
    /**
     * verify code is valid
     * @param resetKey code
     * @param type 验证码操作，默认3为绑定邮箱(或手机)，2为重置密码，1为用户注册
     */
    public verifyCode(resetKey: string, type = 3): Observable<any> {
        const params = new URLSearchParams();
        params.set('resetKey', resetKey);
        params.set('type', type.toString());
        return this.baseService.httpGet(params, '/v1/user/verify_code/is_valid');
    }
    /**
     * 发送验证码 针对忘记密码
     * @param email 账户：邮箱
     * @param phoneNumber 账户：手机号码
     */
    public sendCodeForForget(email: string, phoneNumber: string): Observable<any> {
        const params = '?appKey=' + this.appConfig.AppStarKey
            + '&email=' + email + '&phoneNumber=' + phoneNumber;
        return this.baseService.httpPost(params, '/v1/user/forgot_password');
    }
    /**
     * 重置密码
     * @param restKey 验证码
     * @param password 新密码
     */
    public resetPassword(resetKey: string, password: string): Observable<any> {
        const params = '?resetKey=' + resetKey + '&password=' + password;
        return this.baseService.httpPost(params, '/v1/user/reset_password');
    }
    /**
     *  获取用户信息
     * @param userToken 令牌
     * @param id id
     * @param map 映射数组
     */
    public getUserInfo(id: string, map: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        params.set('id', id);
        params.set('map', map);
        return this.baseService.httpGet(params, '/v1/user/info');
    }
    /**
     * 更新用户信息
     * @param data 欲修改的用户信息
     */
    public updateUserInfo(data: string): Observable<any> {
        const params = '?userToken=' + this.userToken + '&data=' + data;
        return this.baseService.httpPost(params, '/v1/user/update');
    }
    /**
     * account bind email or phone
     * @param email 邮箱
     * @param phoneNumber 手机
     */
    public accountBind(email: string, phoneNumber: string): Observable<any> {
        const params = '?userToken=' + this.userToken + '&email=' + email + '&phoneNumber=' + phoneNumber;
        return this.baseService.httpPost(params, '/v1/user/update_email_phone');
    }
    /**
     * 获取用户购买的应用
     * @param platform 默认获取所有，平台类型：2-Web;4-PC;8-iOS;16-Android
     * @param ownerId 查询指定用户购买的应用，为空时查询当前登录用户购买的应用
     */
    public getUserApps(platform: string, ownerId: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('userToken', this.userToken);
        if (platform) {
            params.set('platform', platform);
        }
        if (ownerId) {
            params.set('ownerId', ownerId);
        }
        return this.baseService.httpGet(params, '/v1/user/apps');
    }
    /**
     * 更新用户头像
     * @param formData 头像数据
     */
    public updateAvatar(formData: FormData) {
        const params = '?userToken=' + this.userToken;
        return this.baseService.httpPostWithFiles(params, '/v1/user/update_avatar', formData);
    }
}
