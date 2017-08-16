export class CurrentUser {
    _id: string; // 用户Id
    Email = ''; // 用户邮箱
    PhoneNumber = ''; // 用户手机号
    RealName: string; // 用户真实姓名
    Avatar: string; // 用户头像
    TokenKey: string; // 根据该TokenKey可以得到UserToken
    UserType: number; // 用户类型
    // tslint:disable-next-line:eofline
}