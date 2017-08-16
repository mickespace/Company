/*
 * @Author: zsq
 * @Date: 2017-07-18 17:34:14
 * @Last Modified by: 
 * @Last Modified time: 2017-07-28 15:59:52
 *模型 特性模块
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
// routes
import { modelRoutes } from './model.routes';
// service
import { ModelService } from './model.service';
// pipe
import { FilesizeTran } from './pipe/filesize.pipe';
import { ElevationTran } from './pipe/elevation.pipe';
// component
import { MainComponent } from './main/main.component';
import { ManageComponent } from './manage/manage.component';
import { BrowseComponent } from './browse/browse.component';
import { UpmodelComponent } from './manage/upmodel/upmodel.component';
import { ConfirmComponent } from './manage/confirm/confirm.component';
import { UpdateTextComponent } from './manage/update-text/update-text.component';
// primeng
import { FileUploadModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { Header, Footer, TreeNode } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FileUploadModule,
    TreeTableModule,
    ContextMenuModule,
    DataTableModule,
    SharedModule,
    RouterModule.forChild(modelRoutes),
  ],
  declarations: [
    MainComponent,
    ManageComponent,
    BrowseComponent,
    FilesizeTran,
    ElevationTran,
    UpmodelComponent,
    ConfirmComponent,
    UpdateTextComponent
  ],
  providers: [ModelService],
  entryComponents: [
    UpmodelComponent,
    UpdateTextComponent,
    ConfirmComponent
  ]
})
export class ModelModule { }
