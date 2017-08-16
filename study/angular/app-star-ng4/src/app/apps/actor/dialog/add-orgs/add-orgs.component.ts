/*
 * @Author: zsq
 * @Date: 2017-08-15 08:49:54
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-15 15:01:22
 *成员添加组织 dialog
 */

import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MemberService } from '../../service/member.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TreeNode } from 'primeng/primeng';
import { OrgService } from '../../service/org.service';
import { OrgTreeData } from '../../model/org-tree-data';


@Component({
  selector: 'app-add-orgs',
  templateUrl: './add-orgs.component.html',
  styleUrls: ['./add-orgs.component.css']
})
export class AddOrgsComponent implements OnInit {

  private curProId = JSON.parse(localStorage.getItem('currentProject'))._id;
  // tree-table
  private treeNodeList = new Array<TreeNode>();
  private selNodes: TreeNode[];
  private orgCount = 0;

  private memberId: string;
  private orgIds = new Array();
  private isOpen = false;
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private memberService: MemberService,
    private orgService: OrgService,

    @Inject(MD_DIALOG_DATA) private data: any
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    const objData = JSON.parse(this.data);
    this.memberId = objData.memberId;
    this.orgIds = JSON.parse(objData.orgIds);
    this.getRogListSub();
  }

  /**
   * 添加组织
   */
  onJoin() {
    const addOrgIds = new Array();
    this.selNodes.forEach(node => {
      if (this.orgIds) {
        if (!this.orgIds.includes(node.data._id)) {
          addOrgIds.push(node.data._id);
        }
      }
    });
    this.memberService.addOrgsForMem(this.memberId, JSON.stringify(addOrgIds)).subscribe(res => {
      if (res['IsOk']) {
        this.selNodes.forEach(node => {
          node.selectable = false;
        });
        this.selNodes.length = 0;
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
  /**
   * 获取组织列表
   */
  public getRogListSub() {
    this.orgService.getOrgList(this.curProId, null).subscribe(res => {
      if (res['IsOk']) {
        const list = this.matchData(res['Data']);
        this.treeNodeList.length = 0;
        list.forEach(el => {
          this.treeNodeList.push(el);
        });
      }
    });
  }
  /**
   * 匹配前端展示数据
   * @param orgData API返回data
   */
  public matchData(orgData: any): TreeNode[] {
    const treeNodeList = new Array<TreeNode>();
    orgData.forEach(nodeData => {
      this.orgCount++;
      // 构造节点
      const treeNode: TreeNode = {};
      // 赋值TreeNode.data
      let mData = new OrgTreeData();
      mData = nodeData;
      treeNode.data = nodeData;
      treeNode.expanded = true;
      // 设为不可操作
      if (this.orgIds.length > 0 && this.orgIds.includes(treeNode.data._id)) {
        treeNode.selectable = false;
      } else {
        treeNode.selectable = true;
      }
      // 赋值 TreeNode.children
      if (nodeData.hasOwnProperty('Children') && nodeData.Children.length > 0) {
        treeNode.children = this.matchData(nodeData.Children);
      }
      treeNodeList.push(treeNode);
    });
    return treeNodeList;
  }
}
