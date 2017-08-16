/*
 * @Author: zsq
 * @Date: 2017-08-10 20:16:07
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-15 14:01:24
 */

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/RX';
// dialog
import { MdDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmComponent } from '../dialog/confirm/confirm.component';
import { InviteComponent } from '../dialog/invite/invite.component';
import { AddOrgsComponent } from '../dialog/add-orgs/add-orgs.component';
import { AddRolesComponent } from '../dialog/add-roles/add-roles.component';
// service
import { LocalStorageService } from '../../../shared/service/localStorage.service';
import { MemberService } from '../service/member.service';
import { AccessService } from '../service/access.service';
// model
import { Member } from '../model/memeber-model';
import { ModuleKeys } from '../model/module-keys';

@Component({
  selector: 'app-memeber',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  // access
  private moduleKeys: ModuleKeys;
  private mKeyList: Array<string>;
  private inviteMemAccess = false;
  private removeMemAccess = false;
  private modifyRolAccess = false;
  private modifyOrgAccess = false;
  private mgntAccess = false;
  // project
  private curProject = JSON.parse(localStorage.getItem('currentProject'));
  private sub = new Subscription();
  // list
  private memberList: Array<Member>;
  private selMember: Member;
  private loading = false;

  constructor(
    private memberService: MemberService,
    private accessService: AccessService,
    private localService: LocalStorageService,
    private dialog: MdDialog,
    private toastr: ToastsManager,
    private vcf: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.moduleKeys = new ModuleKeys();
    this.mKeyList = new Array(this.moduleKeys.MInviteMemeber, this.moduleKeys.MDeleteMemeber,
      this.moduleKeys.MModifyRole, this.moduleKeys.MModifyOrg, this.moduleKeys.MAccessMgnt);
    this.memberList = new Array<Member>();
    this.selMember = new Member();
  }

  ngOnInit() {
    this.initData();
    // watch
    this.sub = this.localService.getStorage('currentProject').subscribe(res => {
      this.curProject = JSON.parse(res.value);
      this.initData();
    });

  }
  /**
   * 初始化数据
   */
  public initData() {
    this.getMemberList(this.curProject._id);
    this.getModulePrivilege(this.mKeyList, this.curProject._id);
  }
  /**
   * 刷新成员列表
   */
  onRefresh() {
    this.getMemberList(this.curProject._id);
  }
  /**
   * 邀请成员
   */
  onInviteMembers() {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '400px'
    });
  }
  /**
   * 移除成员
   */
  onRemoveMembers() {
    const dataParams = {
      'title': '删除警告',
      'content': '确定从当前项目移除成员-' + this.selMember.RealName + '？',
      'isConfirm': true
    };
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      disableClose: true,
      data: JSON.stringify(dataParams)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const mIds = new Array(this.selMember._id);
        this.memberService.removeMembers(JSON.stringify(mIds)).subscribe(remRes => {
          if (remRes['IsOk']) {
            this.memberList.splice(this.selMember.Index, 1);
            this.selMember = null;
          } else {
            this.toastr.error('移除成员失败！');
          }
        });
      }
    });
  }
  /**
   * 添加组织
   */
  onAddOrg() {
    const orgIds = new Array();
    this.selMember.Orgs.forEach(org => {
      orgIds.push(org._id);
    });
    const params = {
      'memberId': this.selMember._id,
      'orgIds': JSON.stringify(orgIds)
    };
    const dialogRef = this.dialog.open(AddOrgsComponent, {
      width: '400px',
      disableClose: true,
      data: JSON.stringify(params)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.memberService.getMemberInfo(this.selMember._id).subscribe(resInfo => {
          if (resInfo['IsOk']) {
            this.selMember.Orgs = resInfo['Data'].Orgs;
          }
        });
      }
    });
  }
  /**
   * 移除此组织
   * @param event 事件
   * @param org 当前组织
   */
  onRemoveOrg(event, org) {
    // 遍历找索引
    let count = 0;
    let index = 0;
    this.selMember.Orgs.forEach(item => {
      if (item._id === org._id) {
        index = count;
      }
      count++;
    });

    const orgIds = JSON.stringify(new Array(org._id));
    this.memberService.removeOrgsFromMem(this.selMember._id, orgIds).subscribe(res => {
      if (res['IsOk']) {
        this.selMember.Orgs.splice(index, 1);
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
  /**
 * 赋予角色
 */
  onAddRole() {
    const roleIds = new Array();
    this.selMember.Roles.forEach(role => {
      roleIds.push(role._id);
    });
    const params = {
      'memberId': this.selMember._id,
      'roleIds': JSON.stringify(roleIds)
    };
    const dialogRef = this.dialog.open(AddRolesComponent, {
      width: '400px',
      disableClose: true,
      data: JSON.stringify(params)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.memberService.getMemberInfo(this.selMember._id).subscribe(resInfo => {
          if (resInfo['IsOk']) {
            this.selMember.Roles = resInfo['Data'].Roles;
          }
        });
      }
    });
  }
  /**
   * 移除此角色
   * @param event 事件
   * @param role 角色
   */
  onRemoveRole(event, role) {
    // 遍历找索引
    let count = 0;
    let index = 0;
    this.selMember.Roles.forEach(item => {
      if (item._id === role._id) {
        index = count;
      }
      count++;
    });
    const roleIds = JSON.stringify(new Array(role._id));
    this.memberService.deleteRolesFromMem(this.selMember._id, roleIds).subscribe(res => {
      if (res['IsOk']) {
        this.selMember.Roles.splice(index, 1);
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
  /**
   * 获取成员列表
   * @param proId 项目id
   */
  public getMemberList(proId: string) {
    this.loading = true;
    this.selMember = null;
    this.memberService.getMemberList(proId, '').subscribe(res => {
      if (res['IsOk']) {
        this.memberList = res['Data'];
        let index = 0;
        this.memberList.forEach(mem => {
          // set index
          mem.Index = index;
          index++;
          // set info
          mem.RealName = mem.UserInfo.RealName;
          mem.PhoneNumber = mem.UserInfo.PhoneNumber;
          mem.Email = mem.UserInfo.Email;
          if (mem.UserInfo.UserId.indexOf(this.curProject.OwnerId) > 0) {
            mem.IsCurProOwnerId = true;
          }
        });
        this.loading = false;
      } else {
        console.log('获取成员列表失败');
      }
    });
  }
  /**
   * 功能模块权限获取
   */
  public getModulePrivilege(moduleKeylist: Array<string>, projectId: string) {
    const moduleKeys = JSON.stringify(moduleKeylist);
    this.accessService.getModuleAccessCurUser(moduleKeys, projectId).subscribe(res => {
      if (res['IsOk']) {
        res['Data'].forEach(item => {
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.MInviteMemeber) {
            this.inviteMemAccess = Boolean(item.RealAccess);
            // console.log('inviteMemAccess:' + this.inviteMemAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.MDeleteMemeber) {
            this.removeMemAccess = Boolean(item.RealAccess);
            // console.log('removeMemAccess:' + this.removeMemAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.MModifyRole) {
            this.modifyRolAccess = Boolean(item.RealAccess);
            // console.log('modifyRolAccess:' + this.modifyRolAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.MModifyOrg) {
            this.modifyOrgAccess = Boolean(item.RealAccess);
            // console.log('modifyOrgAccess:' + this.modifyOrgAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.MAccessMgnt) {
            this.mgntAccess = Boolean(item.RealAccess);
            // console.log('mgntAccess:' + this.mgntAccess);
          }
        });
      }
    });
  }
}
