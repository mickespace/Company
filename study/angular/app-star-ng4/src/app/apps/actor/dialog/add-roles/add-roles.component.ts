import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberService } from '../../service/member.service';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role-model';
import { ListParams } from '../../../../shared/model/listParams-model';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css']
})
export class AddRolesComponent implements OnInit {

  private curProId = JSON.parse(localStorage.getItem('currentProject'))._id;
  private memberId: string;
  private roleIds = new Array();
  private roleList: Array<Role>;
  private selRoles: Array<Role>;
  private isOpen = false;
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private memberService: MemberService,
    private roleService: RoleService,
    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.roleList = new Array<Role>();
    this.selRoles = new Array<Role>();
  }

  ngOnInit() {
    const dataObj = JSON.parse(this.data);
    this.memberId = dataObj.memberId;
    this.roleIds = JSON.parse(dataObj.roleIds);
    this.getRoleListSub();
  }
  /**
   * 选中已经赋予的角色处理-达到一种选不了的效果
   */
  onSelect(event) {
    if (this.roleIds) {
      if (this.roleIds.includes(event.data._id) && this.selRoles.length === 1) {
        this.selRoles.length = 0;
      }
    }
  }
  /**
   * 添加角色
   */
  OnAddRoles() {
    const addRoleIds = new Array();
    this.selRoles.forEach(rl => {
      if (this.roleIds) {
        if (!this.roleIds.includes(rl._id)) {
          addRoleIds.push(rl._id);
        }
      }
    });
    this.memberService.addRolesForMem(this.memberId, JSON.stringify(addRoleIds)).subscribe(res => {
      if (res['IsOk']) {
        this.selRoles.forEach(rl => {
          rl.IsBelong = true;
        });
        this.selRoles.length = 0;
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
  /**
   * 获取角色列表
   */
  public getRoleListSub() {
    const listparams = new ListParams();
    listparams.Map = new Array('_id', 'Name');
    this.roleService.getRoleList(this.curProId, JSON.stringify(listparams)).subscribe(res => {
      if (res['IsOk']) {
        this.roleList = res['Data'];
        this.roleList.forEach(rl => {
          if (this.roleIds.length > 0 && this.roleIds.includes(rl._id)) {
            rl.IsBelong = true;
          } else {
            rl.IsBelong = false;
          }
        });
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
  /**
    * tip的显示和隐藏
  */
  public onOpenTip() {
    if (this.isOpen) {
      this.isOpen = false;
    } else if (!this.isOpen) {
      this.isOpen = true;
    }
  }
}
