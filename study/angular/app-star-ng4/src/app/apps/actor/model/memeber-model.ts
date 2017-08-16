export class Member {
    _id: string;
    ProjectId: string;
    UserInfo: any;
    JoinDate: Date;
    Orgs: Array<any>;
    Roles: Array<any>;
    // view model
    RealName: string;
    PhoneNumber: string;
    Email: string;
    IsCurProOwnerId = false;
    Index: number; // array index for delete
    // tslint:disable-next-line:eofline
}