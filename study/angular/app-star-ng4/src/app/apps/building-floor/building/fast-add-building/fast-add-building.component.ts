import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Building } from '../../models/building';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-fast-add-building',
  templateUrl: './fast-add-building.component.html',
  styleUrls: ['./fast-add-building.component.css'],
  providers: [BuildingService]
})
export class FastAddBuildingComponent implements OnInit {
  public BuildingInfos: string;
  private existCode: string[];
  constructor(
    public dialogRef: MdDialogRef<FastAddBuildingComponent>,
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private dialog: MdDialog,
    private service: BuildingService,
    @Inject(MD_DIALOG_DATA) private data: string[]
  ) {
    this.toastr.setRootViewContainerRef(vcf);
    this.existCode = data;
  }

  ngOnInit() {
  }

  addBuildings() {
    let info = this.BuildingInfos.replace('；', ';');
    while (info.includes('\n')) {
      info = info.replace('\n', ';');
    }
    info = info.trim();
    const buildingInfos = info.split(';');
    const data = [];
    for (let index = 0; index < buildingInfos.length; index++) {
      let building = buildingInfos[index];
      building = building.replace('，', ',');
      const buildingPros = building.split(',');
      if (buildingPros.length < 3) {
        continue;
      }
      const code = buildingPros[0];
      if (this.existCode.includes(code)) {
        continue;
      }
      const newBuild = {
        Name: buildingPros[1],
        Code: code,
        Area: buildingPros[2]
      };
      if (buildingPros.length >= 4) {
        newBuild['Description'] = buildingPros[3];
      }
      data.push(newBuild);
    }
    if (data.length === 0) {
      return;
    }
    this.service.addBuildings(JSON.stringify(data));
  }

}
