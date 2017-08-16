import { Component, OnInit, Output, EventEmitter, ElementRef, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BuildingService } from '../services/building.service';
import { Observable } from 'rxjs/Observable';
import { Building } from '../models/building';
import { ToastsManager } from 'ng2-toastr';
import { AddBuildingComponent } from '../building/add-building/add-building.component';
import { FastAddBuildingComponent } from '../building/fast-add-building/fast-add-building.component';
import { UpdateBuildingComponent } from '../building/update-building/update-building.component';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
  providers: [BuildingService]
})
export class BuildingComponent implements OnInit {

  buildings: Observable<Building[]>;
  chooseBuildingId: string = null;

  constructor(
    private service: BuildingService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
  ) {
    toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
    this.onRefresh();
  }

  onChangeBuilding(currentId) {
    this.chooseBuildingId = currentId;
  }

  onRefresh() {
    this.buildings = this.service.buildings;
    this.service.GetBuildingListAsync();
  }

  onAddBuilding() {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      height: '400px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  onAddBuildings() {
    const dialogRef = this.dialog.open(FastAddBuildingComponent, {
      height: '400px',
      width: '500px',
      data: this.service.existBuildingCode
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  onDeleteBuilding() {
    this.service.deleteBuildings();
  }

  onUpdateBuilding() {
    const selectBuilding = this.service.selectBuilding;
    if (selectBuilding === null) {
      return;
    }
    const dialogRef = this.dialog.open(UpdateBuildingComponent, {
      height: '400px',
      width: '500px',
      data: selectBuilding,
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}
