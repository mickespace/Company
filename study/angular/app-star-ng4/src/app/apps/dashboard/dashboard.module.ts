/*
 * @Author: zsq
 * @Date: 2017-06-22 17:57:23
 * @Last Modified by: 
 * @Last Modified time: 2017-07-04 15:39:20
 * @Desc:仪表板-特性module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// 仪表板
import { GridsterModule } from 'angular-gridster2';
// material 视图
import { MaterialModule } from '@angular/material';
import { CenterComponent } from './center/center.component';
import { dashboardRoutes } from './dashboard.routes';
// 小部件
import { ProjectinfoComponent } from './widget/projectinfo/projectinfo.component';
import { MessageComponent } from './widget/message/message.component';
// service
import { DashboardService } from './dashboard.service';
// pipe
import { SafeHtmlPipe } from './pipe/safehtml.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        GridsterModule,
        RouterModule.forChild(dashboardRoutes)
    ],
    declarations: [
        CenterComponent,
        ProjectinfoComponent,
        MessageComponent,
        SafeHtmlPipe
    ],
    providers: [DashboardService]
})
export class DashboardModule { }