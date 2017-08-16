import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Message } from '../model/message-model';
import { MessageService } from '../service/message.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './detail.dialog.html',
  styleUrls: ['./detail.dialog.css']
})
export class DetailDialog implements OnInit {
  public userToken: string;
  public url: string;
  constructor(
    public dialogRef: MdDialogRef<DetailDialog>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private messageService: MessageService,
    @Inject(MD_DIALOG_DATA) public data: Message
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.url = '../assets/delete.png';
  }

  ngOnInit() {
  }

  onDelete() {
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken !== null) {
      const ids = [];
      ids.push(this.data._id);
      this.messageService.DeleteNoticesMarkAsync(this.userToken, ids)
        .subscribe((res) => {
          if (!res['IsOk']) {
            this.toastr.info('删除消息数据失败。' + res['Message']);
          }
        });
    } else {
      this.toastr.info('删除消息数据失败。');
    }
    this.dialogRef.close();
  }

}
