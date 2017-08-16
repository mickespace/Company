/*
 * @Author: zsq 
 * @Date: 2017-06-16 09:57:04 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-16 10:09:41
 * @Desc:个人中心子路由配置
 */
import { RouterModule } from '@angular/router';
import { CenterComponent } from './center/center.component';
import { InfoComponent } from './info/info.component';
import { SecurityComponent } from './security/security.component';
import { AppComponent } from './app/app.component';

export const userRoutes = [
    {
        path: '',
        component: CenterComponent,
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: InfoComponent },
            { path: 'security', component: SecurityComponent },
            { path: 'appMgt', component: AppComponent }
        ]
    }
];