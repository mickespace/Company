import { RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/service/auth-guard.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { RegisterComponent } from './register/register.component';
import { PromoreComponent } from './promore/promore.component';
export const appRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forget',
        component: ForgetComponent
    },
    {
        path: 'prolist',
        component: PromoreComponent,
        canLoad: [AuthGuardService]
    },
    // 一般特性module加载
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule'
    },
    // 应用-特性module加载
    {
        path: 'dashboard',
        loadChildren: './apps/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'actor',
        loadChildren: './apps/actor/actor.module#ActorModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'building',
        loadChildren: './apps/building-floor/building-floor.module#BuildingFloorModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'projectinfo',
        loadChildren: './apps/project-info/project-info.module#ProjectInfoModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'message',
        loadChildren: './apps/message/message.module#MessageModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'model',
        loadChildren: './apps/model/model.module#ModelModule',
        canLoad: [AuthGuardService]
    }
];