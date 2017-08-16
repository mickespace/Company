/*
 * @Author: zsq
 * @Date: 2017-08-15 14:07:54
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-15 14:45:33
 *role data
 */
export class Role {
    _id: string;
    Name: string;
    IsDefault: boolean; // 是否是系统默认角色，系统默认角色不能被删除
    Description: string;
    Creator: any;
    CreateDate: Date;
    // view
    IsBelong: boolean;
    // tslint:disable-next-line:eofline
}