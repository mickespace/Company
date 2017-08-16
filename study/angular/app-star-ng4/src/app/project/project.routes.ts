/*
 * @Author: zsq 
 * @Date: 2017-07-10 16:44:35 
 * @Last Modified by: 
 * @Last Modified time: 2017-07-10 17:10:28
 *项目 子路由配置
 */
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from '../shared/service/auth-guard.service';

export const projectRoutes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'projectinfo', pathMatch: 'full' },
            {
                path: 'projectinfo',
                loadChildren: '../apps/project-info/project-info.module#ProjectInfoModule',
                canLoad: [AuthGuardService]
            },
            {
                path: 'actor',
                loadChildren: '../apps/actor/actor.module#ActorModule',
                canLoad: [AuthGuardService]
            },
            {
                path: 'building',
                loadChildren: '../apps/building-floor/building-floor.module#BuildingFloorModule',
                canLoad: [AuthGuardService]
            }
        ]
    }
];