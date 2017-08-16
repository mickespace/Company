import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Floor } from '../../models/floor';
import { FloorService } from '../../services/floor.service';

@Component({
  selector: 'app-fast-add-floor',
  templateUrl: './fast-add-floor.component.html',
  styleUrls: ['./fast-add-floor.component.css'],
  providers: [FloorService]
})
export class FastAddFloorComponent implements OnInit {
  public code: string;
  public architectureElevation: number;
  public structureElevation: number;
  public aboveFloorCount: number;
  public aboveArchitectureHeight: number;
  public aboveStructureHeight: number;
  public belowFloorCount: number;
  public belowArchitectureHeight: number;
  public belowStructureHeight: number;
  public axisFilePath: string;
  private existCode: string[];
  private buildingId: string;
  constructor(
    public dialogRef: MdDialogRef<FastAddFloorComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: FloorService,
    @Inject(MD_DIALOG_DATA) private data: string
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.existCode = this.service.existFloorCode;
    this.buildingId = data;
  }

  ngOnInit() {
    this.architectureElevation = 0.00;
    this.structureElevation = 2.00;
    this.aboveFloorCount = 7;
    this.aboveArchitectureHeight = 3.20;
    this.aboveStructureHeight = 3.20;
    this.belowFloorCount = 3;
    this.belowArchitectureHeight = 3.00;
    this.belowStructureHeight = 3.00;
  }

  addFloors() {
    const data = [];
    for (let i = 0; i < this.aboveFloorCount; i++) {
      const record = {
        Name: '第' + i + '层',
        Description: '',
        Code: this.code + '-F' + i,
        IsFirstFloor: i === 1,
        Index: i,
        ArchitectureHeight: this.aboveArchitectureHeight,
        StructureHeight: this.aboveStructureHeight,
        ArchitectureElevation: 0,
        StructureElevation: 0
      };
      if (i === 1) { // 首层
        record['ArchitectureElevation'] = this.architectureElevation;
        record['StructureElevation'] = this.structureElevation;
      }
      data.push(record);
    }
    for (let i = 0; i < this.belowFloorCount; i++) {
      const record = {
        Name: '第-' + i + '层',
        Description: '',
        Code: this.code + '-B' + i,
        IsFirstFloor: false,
        Index: -i,
        ArchitectureHeight: this.belowArchitectureHeight,
        StructureHeight: this.belowStructureHeight,
        ArchitectureElevation: 0,
        StructureElevation: 0
      };
      data.push(record);
    }
    if (data.length === 0) {
      return;
    }
    this.service.addFloors(this.buildingId, JSON.stringify(data));
  }

}
