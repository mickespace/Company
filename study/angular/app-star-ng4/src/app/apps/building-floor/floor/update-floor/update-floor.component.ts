import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Floor } from '../../models/floor';
import { FloorService } from '../../services/floor.service';
@Component({
  selector: 'app-update-floor',
  templateUrl: './update-floor.component.html',
  styleUrls: ['./update-floor.component.css'],
  providers: [FloorService]
})
export class UpdateFloorComponent implements OnInit {
  public floor: Floor;
  constructor(
    public dialogRef: MdDialogRef<UpdateFloorComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: FloorService,
    @Inject(MD_DIALOG_DATA) private data: Floor
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.floor = JSON.parse(JSON.stringify(data));
  }

  ngOnInit() {
  }

  updateFloor() {
    const data = {
      Name: this.floor.Name,
      Code: this.floor.Code,
      Index: this.floor.Index,
      ArchitectureHeight: this.floor.ArchitectureHeight,
      StructureHeight: this.floor.StructureHeight,
      ArchitectureElevation: this.floor.ArchitectureElevation,
      StructureElevation: this.floor.StructureElevation,
      Description: this.floor.Description,
    };
    this.service.updateFloors(this.floor._id, JSON.stringify(data));
  }

}
