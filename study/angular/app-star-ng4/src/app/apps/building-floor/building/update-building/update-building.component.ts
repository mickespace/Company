import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Building } from '../../models/building';
import { BuildingService } from '../../services/building.service';
@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css'],
  providers: [BuildingService]
})
export class UpdateBuildingComponent implements OnInit {
  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public area: number;
  constructor(
    public dialogRef: MdDialogRef<UpdateBuildingComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: BuildingService,
    @Inject(MD_DIALOG_DATA) private data: Building
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.id = data._id;
    this.code = data.Code;
    this.name = data.Name;
    this.area = data.Area;
    this.description = data.Description;
  }

  ngOnInit() {
  }

  updateBuilding() {
    const data = {
      Name: this.name,
      Code: this.code,
      Area: this.area,
      Description: this.description
    };
    this.service.updateBuildings(this.id, JSON.stringify(data));
  }

}
