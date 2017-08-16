export class Project {
    _id: string; // 项目id
    Name: string;
    Icon: string;
    Description: string;
    Publicity: number;
    OwnerId: string;
    CreateorId: string; // 拼写错误 也要这么搞,因为数据库这么写的
    CreatedDate: Date;
    Apps: Array<string>;
    // 视图需要添加
    IsCreator = false;
    // tslint:disable-next-line:eofline
}