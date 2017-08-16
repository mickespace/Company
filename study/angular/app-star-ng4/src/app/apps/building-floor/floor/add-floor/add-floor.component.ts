import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Floor } from '../../models/floor';
import { FloorService } from '../../services/floor.service';
@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrls: ['./add-floor.component.css'],
  providers: [FloorService]
})
export class AddFloorComponent implements OnInit {
  public code: string;
  public name: string;
  public index: string;
  public architectureHeight: string;
  public structureHeight: string;
  public architectureElevation: string;
  public structureElevation: string;
  public description: string;
  private buildingId: string;
  private existCode: string;
  constructor(
    public dialogRef: MdDialogRef<AddFloorComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: FloorService,
    @Inject(MD_DIALOG_DATA) private data: string
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.buildingId = data;
  }

  ngOnInit() {
  }

  addFloor() {
    const data = [{
      Code: this.code,
      Name: this.name,
      Index: this.index,
      ArchitectureHeight: this.architectureHeight,
      StructureHeight: this.structureHeight,
      ArchitectureElevation: this.architectureElevation,
      StructureElevationArea: this.structureElevation,
      Description: this.description
    }];
    if (this.buildingId === null) {
      return;
    }
    this.service.addFloors(this.buildingId, JSON.stringify(data));
  }

}
