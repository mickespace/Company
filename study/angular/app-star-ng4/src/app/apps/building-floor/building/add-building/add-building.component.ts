import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Building } from '../../models/building';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css'],
  providers: [BuildingService]
})
export class AddBuildingComponent implements OnInit {

  public code: string;
  public name: string;
  public description: string;
  public area: string;
  constructor(
    public dialogRef: MdDialogRef<AddBuildingComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: BuildingService
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
  }

  addBuilding() {
    const data = [{
      Name: this.name,
      Code: this.code,
      Area: this.area,
      Description: this.description
    }];
    this.service.addBuildings(JSON.stringify(data));
  }
}
