/*
 * @Author: zsq 
 * @Date: 2017-07-10 16:44:01 
 * @Last Modified by: 
 * @Last Modified time: 2017-07-11 15:55:17
 *项目-子路由导航 特性module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MainComponent } from './main/main.component';
// routes
import { projectRoutes } from './project.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(projectRoutes)
  ],
  declarations: [MainComponent]
})
export class ProjectModule { }
