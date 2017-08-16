import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  private title: string;
  private content: string;
  private isConfirm: string;
  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<ConfirmComponent>
  ) {
    if (this.data !== undefined) {
      const dataObj = JSON.parse(this.data);
      this.title = dataObj.title;
      this.content = dataObj.content;
      this.isConfirm = dataObj.isConfirm;
    }
  }
}
