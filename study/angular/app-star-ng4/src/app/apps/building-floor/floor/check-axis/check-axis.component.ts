import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Floor } from '../../models/floor';
import { FloorService } from '../../services/floor.service';

@Component({
  selector: 'app-check-axis',
  templateUrl: './check-axis.component.html',
  styleUrls: ['./check-axis.component.css'],
  providers: [FloorService]
})
export class CheckAxisComponent implements OnInit {
  private floorId: string;
  constructor(
    public dialogRef: MdDialogRef<CheckAxisComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: FloorService,
    @Inject(MD_DIALOG_DATA) private data: string
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.floorId = data;
  }

  ngOnInit() {
  }

  replaceAxis() {
    this.service.updateAxisFile(this.floorId);
  }

  deleteAxis() {
    this.service.deleteAxisFile(this.floorId);
  }
}
