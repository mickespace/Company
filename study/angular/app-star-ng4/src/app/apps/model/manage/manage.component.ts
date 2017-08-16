/*
 * @Author: zsq
 * @Date: 2017-07-19 09:45:29
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-15 10:10:43
 * 模型管理主视图
 */

import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/RX';
import { ModelService } from '../model.service';
import { MdDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
// ng2-toastr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// model
import { TreeNode } from 'primeng/primeng';
import { ModelTreeData } from '../model/model-tree-data';
import { ModuleKeys } from '../model/module-keys';
// dialog
import { UpmodelComponent } from './upmodel/upmodel.component';
import { UpdateTextComponent } from './update-text/update-text.component';
import { ConfirmComponent } from './confirm/confirm.component';
// primeng
import { MenuItem } from 'primeng/primeng';
// service
import { LocalStorageService } from '../../../shared/service/localStorage.service';
import { ConfigService } from '../../../shared/service/config.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  private proName = JSON.parse(localStorage.getItem('currentProject')).Name;
  public projectId = JSON.parse(localStorage.getItem('currentProject'))._id;
  private curProCUserId = JSON.parse(localStorage.getItem('currentProject')).CreateorId;
  // 用户级别限制集合
  private userLevelDatas = JSON.parse(localStorage.getItem('userLevelDatas'));
  private fileMaxSize: number; // 单个文件大小要根据用户类别限定
  private fileMaxCount: number; // 根据当前已拥有模型个数和用户类别限定
  public subsciption: Subscription;
  // 功能权限返回结果
  public moduleKeys = new ModuleKeys();
  public privilegeParams = new Array(this.moduleKeys.AddNode, this.moduleKeys.DeleteNode, this.moduleKeys.ModifyNode);
  public addNodeAccess = false;
  public modifyNodeAccess = false;
  public deleteNodeAccess = false;
  public modulePrivilegeRes = new Array<any>();
  // tree-table
  public treeNodeList = new Array<TreeNode>();
  public selNodes: TreeNode[];
  public selNode: TreeNode;
  // 模型文件数量
  public modelFilesCount = 0;
  public cmItems: MenuItem[];
  public isBuilding = true;
  public isGroup = true;
  // 是否显示tip
  public isOpen = false;

  constructor(
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
    public modelService: ModelService,
    public localService: LocalStorageService,
    public configService: ConfigService,
    public userService: UserService,
    public dialog: MdDialog,
    public title: Title
  ) {
    this.title.setTitle('模型-实体模型');
    this.toastr.setRootViewContainerRef(vcf);
  }

  /**
   * 加载
   */
  ngOnInit() {
    this.subsciption = this.localService.getStorage('currentProject').subscribe(stor => {
      this.proName = JSON.parse(stor.value).Name;
      this.projectId = JSON.parse(stor.value)._id;
      this.curProCUserId = JSON.parse(stor.value).CreateorId;
      this.getModulePrivilege(this.privilegeParams, this.projectId);
      this.initItems(this.isGroup, this.isBuilding);
      this.getProjectTreeList(this.projectId);
      this.getCurProLevelByUserId(this.curProCUserId);
    });
    // todo:根据权限显示table-header操作项和右键菜单操作项
    this.getModulePrivilege(this.privilegeParams, this.projectId);
    this.initItems(this.isGroup, this.isBuilding);
    this.getProjectTreeList(this.projectId);
    // 项目限制
    this.getCurProLevelByUserId(this.curProCUserId);
  }

  public initItems(isGroup: boolean, isBuilding: boolean) {
    this.cmItems = null;
    this.cmItems = [
      { label: '展开', icon: 'fa fa-arrows-alt fa-lg', command: (event) => this.expandNodes(this.selNodes) },
      { label: '收起', icon: 'fa fa-compress fa-lg', command: (event) => this.collapseNodes(this.selNodes) }
    ];
    if (this.addNodeAccess) {
      this.cmItems.push({ label: '添加分组', icon: 'fa fa-object-group fa-lg', command: (event) => this.addGroup(), disabled: !isGroup });
    }
    if (this.modifyNodeAccess) {
      this.cmItems.push({ label: '编辑本栏', icon: 'fa fa-pencil-square-o fa-lg', command: (event) => this.editItem(), disabled: isBuilding });
    }
    if (this.addNodeAccess) {
      this.cmItems.push({ label: '新增模型', icon: 'fa fa-plus-circle fa-lg', command: (event) => this.addModelFile(), disabled: !isGroup });
    }
    if (this.modifyNodeAccess) {
      this.cmItems.push({ label: '更新模型', icon: 'fa fa-refresh fa-lg', command: (event) => this.updateModelFile(), disabled: isGroup });
    }
    if (this.deleteNodeAccess) {
      this.cmItems.push({ label: '删除', icon: 'fa fa-trash-o fa-lg', command: (event) => this.deleteNodes(), disabled: isBuilding });
    }
  }
  /**
   * 节点选择
   * @param event event
   */
  public nodeSelect(event) {
    this.selNode = event.node;
    // 项目判定
    this.isBuilding = this.selNode.data.IsBuilding;
    // 组判定
    if (this.selNode.data.Fs_id !== undefined) {
      this.isGroup = false;
    } else {
      this.isGroup = true;
    }
    this.initItems(this.isGroup, this.isBuilding);
  }

  /**
   * 刷新
   */
  public refresh() {
    this.getProjectTreeList(this.projectId);
  }
  /**
   * 添加分组
   * @param nodes 选中的节点集合
   */
  public addGroup() {
    if (this.selNode.data._id != null) {
      this.modelService.addGroupNode(this.selNode.data._id, '新建分组', '').subscribe((res) => {
        if (res['IsOk']) {
          this.toastr.success('添加分组成功！', '结果');
          this.getProjectTreeList(this.projectId);
        } else {
          this.toastr.warning('添加分组成功！', '结果');
        }
      });
    }
  }
  /**
   * 编辑当前栏
   */
  public editItem() {
    if (this.selNode.data._id != null) {
      const params = {
        'id': this.selNode.data._id,
        'Name': this.selNode.data.Name,
        'Description': this.selNode.data.Description,
        'ElevationSystem': this.selNode.data.ElevationSystem
      };
      const dialogRef = this.dialog.open(UpdateTextComponent, {
        width: '400px',
        disableClose: true,
        data: JSON.stringify(params)
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.getProjectTreeList(this.projectId);
        }
      });
    }
  }
  /**
   * 添加模型文件
   */
  public addModelFile() {
    if (this.fileMaxCount <= 0) {
      this.toastr.info('您当前模型数量已达到上线，不能添加。', '提示');
      return;
    }
    // type(0:add;1:update)
    const dataParams = {
      'title': '添加模型',
      'type': '0',
      'curId': this.selNode.data._id,
      'fileMaxCount': this.fileMaxCount,
      'fileMaxSize': this.fileMaxSize
    };
    this.openUploadDialog(dataParams);
  }
  /**
   * 更新模型文件
   */
  public updateModelFile() {
    const dataParams = {
      'title': '更新模型',
      'type': '1',
      'curId': this.selNode.data._id,
      'fileMaxCount': 1,
      'fileMaxSize': this.fileMaxSize
    };
    this.openUploadDialog(dataParams);
  }
  /**
   * 打开dialog
   * @param dataParams 参数
   */
  public openUploadDialog(dataParams: any) {
    const dialogRef = this.dialog.open(UpmodelComponent, {
      width: '620px',
      disableClose: true,
      data: JSON.stringify(dataParams)
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getProjectTreeList(this.projectId);
      }
    });
  }
  /**
   * 删除节点
   */
  public deleteNodes() {
    const dataParams = {
      'title': '删除警告',
      'content': '确定删除本节点，如本节点下含有子节点，也将一并全部删除？',
      'isConfirm': true
    };
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      disableClose: true,
      data: JSON.stringify(dataParams)
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const ids = new Array<string>();
        this.idsTreeTraverse(this.selNodes, ids);
        this.modelService.deleteNodes(JSON.stringify(ids)).subscribe((resDelete) => {
          if (resDelete['IsOk']) {
            this.toastr.success('删除成功！', '结果');
            this.getProjectTreeList(this.projectId);
          } else {
            this.toastr.error(resDelete['Message'], '结果');
          }
        });
      }
    });

  }
  /**
   * 展开
   */
  public expandAll() {
    this.expandTreeTraverse(this.treeNodeList, true);
  }
  /**
   * 收缩
   */
  public collapseAll() {
    this.expandTreeTraverse(this.treeNodeList, false);
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
  // 右键菜单操作
  /**
   * 右键菜单-展开节点
   * @param nodes 节点
   */
  public expandNodes(nodes: TreeNode[]) {
    this.expandTreeTraverse(nodes, true);
  }
  /**
   * 右键菜单-收起节点
   * @param nodes 节点
   */
  public collapseNodes(nodes: TreeNode[]) {
    this.expandTreeTraverse(nodes, false);
  }
  /**
   * 获取项目树列表方法
   * @param projectId 项目id
   */
  public getProjectTreeList(projectId: string) {
    this.selNode = null;
    this.modelFilesCount = 0;
    this.modelService.projectTreeList(projectId, null).subscribe((res) => {
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
   * 根据当前项目创建者id获取 当前项目级别限制信息
   * @param id 当前项目创建者id
   */
  public getCurProLevelByUserId(id: string) {
    const map = new Array('UserType');
    this.userService.getUserInfo(id, JSON.stringify(map)).subscribe(res => {
      if (res['IsOk']) {
        this.userLevelDatas.forEach(data => {
          if (String(res['Data'].UserType) === data.UserType) {
            const curProLevelData = data;
            // 用户限制 部分数据计算
            if (curProLevelData.UserType === '100' || curProLevelData.UserType === '2') {
              // 假定不限定为以下配置
              this.fileMaxCount = 100;
              this.fileMaxSize = 500 * 1024 * 1024;
            } else {
              this.fileMaxCount = Number(curProLevelData.ProjectModelCount) - this.modelFilesCount;
              this.fileMaxSize = Number(curProLevelData.ModelMaxSize) * 1024 * 1024;
            }
          }
        });
      }
    });
  }
  /**
   * 功能模块权限获取
   */
  public getModulePrivilege(moduleKeylist: Array<string>, projectId: string) {
    const moduleKeys = JSON.stringify(moduleKeylist);
    this.configService.getAppModulePrivilege(moduleKeys, projectId).subscribe(res => {
      if (res['IsOk']) {
        res['Data'].forEach(item => {
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.AddNode) {
            this.addNodeAccess = Boolean(item.RealAccess);
            // console.log('addNodeAccess:' + this.addNodeAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.ModifyNode) {
            this.modifyNodeAccess = Boolean(item.RealAccess);
            // console.log('modifyNodeAccess:' + this.modifyNodeAccess);
          }
          if (String(item.ModuleKey).toUpperCase() === this.moduleKeys.DeleteNode) {
            this.deleteNodeAccess = Boolean(item.RealAccess);
            // console.log('dele-access:' + this.deleteNodeAccess);
          }
          // todo 等待对接
        });
      }
    });
  }
  /**
   * 匹配前端展示数据
   * @param projectData API返回data
   */
  public matchData(projectData: any): TreeNode[] {
    const treeNodeList = new Array<TreeNode>();
    projectData.forEach(nodeData => {
      // 构造节点
      const treeNode: TreeNode = {};
      // 赋值TreeNode.data
      this.matchFile(nodeData);
      treeNode.data = nodeData;
      // 赋值 TreeNode.children
      if (nodeData.hasOwnProperty('Children') && nodeData.Children.length > 0) {
        treeNode.children = this.matchData(nodeData.Children);
      }
      treeNodeList.push(treeNode);
    });
    return treeNodeList;
  }

  /**
   * 匹配File字段
   * @param mData modelTreeNode对象
   * @param node 节点信息
   */
  public matchFile(node: any) {
    let mData = new ModelTreeData();
    mData = node;
    if (node.hasOwnProperty('File')) {
      mData.Fs_id = node.File._id;
      mData.FsId = node.File.FsId;
      mData.FsFileSize = node.File.FileSize;
      mData.FsName = node.File.Name;
      mData.FsVersion = node.File.Version;
      mData.FsUpdateUserId = node.File.UpdateUserId;
      mData.FsUpdateDate = node.File.UpdateDate;
      this.modelFilesCount++;
    }
  }
  /**
   * 深度遍历树-展开或收起
   * @param treeNodes 树节点
   * @param isExpand 是否展开
   */
  public expandTreeTraverse(treeNodes: TreeNode[], isExpand: boolean) {
    treeNodes.forEach(node => {
      node.expanded = isExpand;
      if (node.hasOwnProperty('children') && node.children.length > 0) {
        this.expandTreeTraverse(node.children, isExpand);
      }
    });
  }
  /**
   * 深度遍历树-获取树节点集合
   * @param treenodes 树节点
   * @param ids 节点集合
   */
  public idsTreeTraverse(treenodes: TreeNode[], ids: Array<string>) {
    treenodes.forEach(node => {
      ids.push(node.data._id);
      if (node.hasOwnProperty('children') && node.children.length > 0) {
        this.idsTreeTraverse(node.children, ids);
      }
    });
  }
}
