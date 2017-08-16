import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
// module
import { ProjectInfoComponent } from './project-info/project-info.component';
import { projectInfoRoutes } from './project-info.routes';
import { addDialog } from './project-info/addDialog/addDialog';
import { editDialog } from './project-info/editDialog/editDialog';
// material
import { MdTabsModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MaterialModule } from '@angular/material';
// primeng
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
// ngx
import { CarouselModule } from 'ngx-bootstrap';
// service
import { ProjectInfoService } from './project-info.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(projectInfoRoutes),
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MdDialogModule,
    MdTabsModule,
    DialogModule,
    MaterialModule,
    CarouselModule.forRoot(),
    FileUploadModule,
    CalendarModule,
    GalleriaModule
  ],
  declarations: [ProjectInfoComponent, addDialog, editDialog],
  providers: [ProjectInfoService],
  entryComponents: [
    addDialog,
    editDialog
  ]
})
export class ProjectInfoModule { }
