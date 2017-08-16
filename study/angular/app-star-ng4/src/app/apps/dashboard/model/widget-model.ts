/*
 * @Author: zsq 
 * @Date: 2017-06-29 15:24:22 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-29 15:50:59
 * @Desc:小部件model
 */
export class Widget {
    _id: string;
    Name: string;
    DisplayName: string;
    AppKey: string;
    WidgetKey: string;
    IsDefault: boolean;
    CanUpdate: boolean;
    Position: Array<string>;
}