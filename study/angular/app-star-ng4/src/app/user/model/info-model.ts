/*
 * @Author: zsq 
 * @Date: 2017-06-16 16:46:36 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-16 16:51:26
 * @Desc 用户信息实体
 */
export class Info {
    _id: string;
    RealName: string;
    Birthdate: Date;
    Location: string; // 地址
    Industry: string; // 行业
    CompanyName: string; // 公司名称
    JobPosition: string; // 职位
    UserType: number; // 用户类型（1 内测用户、0 普通用户、10 高级用户、100 企业用户、2 内部用户
    // tslint:disable-next-line:eofline
}