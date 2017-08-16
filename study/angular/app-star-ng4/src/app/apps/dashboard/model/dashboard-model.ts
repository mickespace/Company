/*
 * @Author: zsq 
 * @Date: 2017-06-29 15:16:47 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-29 15:51:22
 * @Desc:仪表板model
 */
import { Widget } from './widget-model';
export class Dashboard {
    _id: string;
    UserId: string;
    ProjectId: string;
    Name: string;
    IsDefault: boolean;
    Widgets: Array<Widget>;
}
