/*
 * @Author: zsq
 * @Date: 2017-06-15 17:02:18
 * @Last Modified by: 
 * @Last Modified time: 2017-06-15 17:12:41
 * @Desc 消息中心 子路由配置类
 */
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

export const messageRoutes = [
    { path: '', component: MainComponent }
];
