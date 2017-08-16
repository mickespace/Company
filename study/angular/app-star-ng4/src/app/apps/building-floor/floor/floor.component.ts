import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FloorService } from '../services/floor.service';
import { Observable } from 'rxjs/Observable';
import { Floor } from '../models/floor';
import { ToastsManager } from 'ng2-toastr';
import { AddFloorComponent } from '../floor/add-floor/add-floor.component';
import { FastAddFloorComponent } from '../floor/fast-add-floor/fast-add-floor.component';
import { UpdateFloorComponent } from '../floor/update-floor/update-floor.component';
import { CheckAxisComponent } from '../floor/check-axis/check-axis.component';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css'],
  providers: [FloorService]
})
export class FloorComponent implements OnInit {
  floors: Observable<Floor[]>;

  @Input() buildingId: string;

  constructor(
    private service: FloorService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog,
    public toastr: ToastsManager,
    public vcf: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.floors = this.service.floors;
    this.service.GetBuildingFloorsAsync(this.buildingId);
  }

  onAddFloor() {
    const dialogRef = this.dialog.open(AddFloorComponent, {
      height: '500px',
      width: '500px',
      data: this.buildingId
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  onAddFloors() {
    const dialogRef = this.dialog.open(FastAddFloorComponent, {
      height: '750px',
      width: '600px',
      data: this.buildingId
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  onDeleteFloor() {
    this.service.deleteFloors();
  }

  onUpdateFloor() {
    const selectFloor = this.service.selectFloor;
    if (selectFloor === null) {
      return;
    }
    const dialogRef = this.dialog.open(UpdateFloorComponent, {
      height: '500px',
      width: '500px',
      data: selectFloor,
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  onCheckAxis() {
    const selectFloor = this.service.selectFloor;
    if (selectFloor === null) {
      return;
    }
    const dialogRef = this.dialog.open(CheckAxisComponent, {
      height: '800px',
      width: '1400px',
      data: selectFloor,
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }
}
