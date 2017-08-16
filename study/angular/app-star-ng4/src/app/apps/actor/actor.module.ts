/*
 * @Author: zsq
 * @Date: 2017-08-10 15:10:37
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-11 16:51:26
 *人员组织 特性模块
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
// routes
import { actorRoutes } from './actor.routes';
// component
import { MainComponent } from './main/main.component';
import { MemberComponent } from './member/member.component';
import { OrgComponent } from './org/org.component';
import { RoleComponent } from './role/role.component';
import { AccessComponent } from './access/access.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { InviteComponent } from './dialog/invite/invite.component';
// pipe
import { StringTran } from './pipe/string.pipe';
// service
import { MemberService } from './service/member.service';
import { OrgService } from './service/org.service';
import { RoleService } from './service/role.service';
import { AccessService } from './service/access.service';
// primeng
import { Header, Footer } from 'primeng/primeng';
import { SharedModule, TreeNode } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { AddRolesComponent } from '../actor/dialog/add-roles/add-roles.component';
import { AddOrgsComponent } from '../actor/dialog/add-orgs/add-orgs.component';

@NgModule({
  imports: [
    RouterModule.forChild(actorRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,
    // primeng
    SharedModule,
    DataTableModule,
    TreeTableModule,
    ContextMenuModule
  ],
  declarations: [
    MainComponent,
    MemberComponent,
    OrgComponent,
    RoleComponent,
    AccessComponent,
    ConfirmComponent,
    // pipe
    StringTran,
    InviteComponent,
    AddRolesComponent,
    AddOrgsComponent
  ],
  providers: [
    MemberService,
    OrgService,
    RoleService,
    AccessService
  ],
  entryComponents: [
    ConfirmComponent,
    InviteComponent,
    AddRolesComponent,
    AddOrgsComponent
  ]
})
export class ActorModule { }
