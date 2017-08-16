import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
// params
import { ListParams } from '../../../shared/model/listParams-model';
// config
import { AppConfig } from '../../../shared/model/apps-config-model';
// service
import { MessageService } from '../service/message.service';
// toastr
import { ToastsManager } from 'ng2-toastr';
// dialog
import { DetailDialog } from '../detail/detail.dialog';
// model
import { Message } from '../model/message-model';
import { MessageType } from '../model/message-type';
import { Project } from '../../../shared/model/project-model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public userToken: string;
  public currentProject: Project; // 当前项目
  public messageModels: Array<Message>; // 消息所有数据
  public messageType: Array<MessageType>; // 消息类型
  public selMessageType: MessageType; // 选择的消息类型
  public isAllChecked: boolean; // 是否全选
  public currentTab: string; // 当前选项卡
  public systemMessCount: number; // 系统消息数量
  public projectMessCount: number; // 项目消息数量
  constructor(
    public toastr: ToastsManager,
    public messageService: MessageService,
    public vcf: ViewContainerRef,
    private dialog: MdDialog
  ) {
    toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.selMessageType = new MessageType();
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken !== null) {
      this.messageType = new Array();
      // const type1 = new MessageType();
      // type1.Value = 'AllMessage';
      // type1.ViewValue = '全部消息';
      const type2 = new MessageType();
      type2.Value = 'UnreadMessage';
      type2.ViewValue = '未读消息';
      const type3 = new MessageType();
      type3.Value = 'ReadMessage';
      type3.ViewValue = '已读消息';
      // this.messageType.push(type1);
      this.messageType.push(type2);
      this.messageType.push(type3);
      this.selMessageType = type2;
      this.currentTab = '项目消息';
      this.currentProject = JSON.parse(localStorage.getItem('currentProject'));
      this.onSetMessageType(type2);
      this.GetSystemNoticesCount(this.userToken, 0, null);
      this.GetProjectNoticesCount(this.userToken, 0, this.currentProject._id);
    }
  }
  /**
 * 刷新按钮事件
 */
  onRefresh() {
    this.onSetMessageType(this.selMessageType);
    this.refreshNoticeCount();
  }

  /**
 * 全选按钮事件
 */
  onAllChecked() {
    if (!this.isAllChecked) {
      for (let index = 0; index < this.messageModels.length; index++) {
        this.messageModels[index].IsChecked = true;
      }
      this.isAllChecked = true;
    } else {
      for (let index = 0; index < this.messageModels.length; index++) {
        this.messageModels[index].IsChecked = false;
      }
      this.isAllChecked = false;
    }
  }

  /**
 * 已读按钮事件
 */
  onMarkRead() {
    if (this.selMessageType.ViewValue !== '未读消息') {
      return;
    }
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken !== null) {
      const ids = [];
      for (let index = 0; index < this.messageModels.length; index++) {
        const model = this.messageModels[index];
        if (model.IsChecked) {
          ids.push(model._id);
        }
      }
      this.noticesMarkRead(this.userToken, ids);
    }
  }

  /**
 * 删除按钮事件
 */
  onDelete() {
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken !== null) {
      const ids = [];
      for (let index = 0; index < this.messageModels.length; index++) {
        const model = this.messageModels[index];
        if (model.IsChecked) {
          ids.push(model._id);
        }
      }
      this.deleteNotices(this.userToken, ids);
    }
  }

  /**
 * 勾选消息事件
 */
  selectMessage(event: any) {
    const t = event.target;
    const v = t.value;
    const c = t.checked;
    for (let index = 0; index < this.messageModels.length; index++) {
      const selModel = this.messageModels[index];
      if (selModel._id === v) {
        selModel.IsChecked = c;
        break;
      }
    }
  }

  /**
 * 选择消息类型事件
 */
  onSetMessageType(value) {
    this.selMessageType = value;
    let projectId = null;
    if (this.currentTab === '项目消息') {
      projectId = this.currentProject._id;
    }
    switch (this.selMessageType.Value) {
      case 'AllMessage':
        this.messageModels = null;
        this.getUserNoticeInfoList(this.userToken, -1, projectId);
        break;
      case 'UnreadMessage':
        this.messageModels = null;
        this.getUserNoticeInfoList(this.userToken, 0, projectId);
        break;
      case 'ReadMessage':
        this.messageModels = null;
        this.getUserNoticeInfoList(this.userToken, 1, projectId);
        break;
      default:
        break;
    }
  }

  /**
   * 切换Tab事件
   */
  onChangeTab(tabIndex) {
    if (tabIndex === 0) {
      this.currentTab = '项目消息';
    } else {
      this.currentTab = '系统消息';
    }
    this.selMessageType = this.messageType.find(t => t.Value === 'UnreadMessage');
    this.onSetMessageType(this.selMessageType);
  }

  /**
   * 详情弹窗事件
   */
  onDetail(messageModel) {
    if (this.selMessageType.ViewValue === '未读消息') {
      this.userToken = localStorage.getItem('userToken');
      if (this.userToken !== null) {
        const ids = [];
        ids.push(messageModel._id);
        this.noticesMarkRead(this.userToken, ids);
      }
    }
    const dialogRef = this.dialog.open(DetailDialog, {
      height: '400px',
      width: '500px',
      data: messageModel
    });
    dialogRef.afterClosed().subscribe(res => {
      this.onRefresh();
    });
  }

  /**
 * 获取指定消息类型的用户消息列表
 */
  private getUserNoticeInfoList(userToken: string, state: number, projectId: string) {
    const listParams = new ListParams();
    listParams.Map = null;
    const params = JSON.stringify(listParams);
    return this.messageService.GetUserNoticeInfoListAsync(userToken, state, projectId, params)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.messageModels = res['Data']
        } else {
          this.toastr.info('获取消息数据失败。' + res['Message']);
        }
      });
  }

  /**
 * 获取系统消息的数量
 */
  private GetSystemNoticesCount(userToken: string, state: number, projectId: string) {
    return this.messageService.GetNoticesCountAsync(userToken, state, projectId)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.systemMessCount = res['Data'];
        } else {
          this.toastr.info('获取系统消息的数量失败。' + res['Message']);
        }
      });
  }

  /**
 * 获取项目消息的数量
 */
  private GetProjectNoticesCount(userToken: string, state: number, projectId: string) {
    return this.messageService.GetNoticesCountAsync(userToken, state, projectId)
      .subscribe((res) => {
        if (res['IsOk']) {
          this.projectMessCount = res['Data'];
        } else {
          this.toastr.info('获取项目消息的数量失败。' + res['Message']);
        }
      });
  }

  /**
   * 标记已读消息
   */
  private noticesMarkRead(userToken: string, ids: string[]) {
    if (ids.length === 0) {
      return;
    }
    return this.messageService.NoticesMarkReadAsync(userToken, ids)
      .subscribe((res) => {
        if (res['IsOk']) {
          ids.forEach(id => {
            const index = this.messageModels.findIndex(t => t._id === id);
            if (index !== -1) {
              this.messageModels.splice(index, 1);
            }
          });
          this.refreshNoticeCount();
        } else {
          this.toastr.info('标记已读消息数据失败。' + res['Message']);
        }
      });
  }

  /**
 * 删除消息
 */
  private deleteNotices(userToken: string, ids: string[]) {
    if (ids.length === 0) {
      return;
    }
    return this.messageService.DeleteNoticesMarkAsync(userToken, ids)
      .subscribe((res) => {
        if (res['IsOk']) {
          ids.forEach(id => {
            const index = this.messageModels.findIndex(t => t._id === id);
            if (index !== -1) {
              this.messageModels.splice(index, 1);
            }
          });
          this.refreshNoticeCount();
        } else {
          this.toastr.info('删除消息数据失败。' + res['Message']);
        }
      });
  }

  /**
 * 刷新消息数量
 */
  private refreshNoticeCount() {
    if (this.currentTab === '项目消息') {
      if (this.currentProject !== null) {
        this.GetProjectNoticesCount(this.userToken, 0, this.currentProject._id);
      }
    } else {
      this.GetSystemNoticesCount(this.userToken, 0, null);
    }
  }
}
