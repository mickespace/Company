/*
 * @Author: zsq 
 * @Date: 2017-07-18 17:33:01 
 * @Last Modified by: 
 * @Last Modified time: 2017-07-18 18:09:44
 *模型 路由配置
 */
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ManageComponent } from './manage/manage.component';
import { BrowseComponent } from './browse/browse.component';

export const modelRoutes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'manage', pathMatch: 'full' },
            { path: 'manage', component: ManageComponent },
            { path: 'browse', component: BrowseComponent }
        ]
    }
    // tslint:disable-next-line:eofline
];