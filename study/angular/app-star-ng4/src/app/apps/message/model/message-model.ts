import { CurrentUser } from '../../../shared//model/user-model';

export class Message {
    _id: string;
    Title: string;
    Content: string;
    NoticeType: string;
    Params: string;
    ProcessText: string;
    ExpiredDate: Date;
    Creator: CurrentUser;
    ProjectId: string;
    CreatedDate: Date;
    IsChecked: boolean;
}
