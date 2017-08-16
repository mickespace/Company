import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BuildingfloorComponent } from './buildingfloor/buildingfloor.component';
import { buildingFloorRoutes } from './building-floor.routes';
import { BuildingComponent } from './building/building.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { BuildingService } from './services/building.service';
import { FloorComponent } from './floor/floor.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { AddBuildingComponent } from './building/add-building/add-building.component';
import { UpdateBuildingComponent } from './building/update-building/update-building.component';
import { FastAddBuildingComponent } from './building/fast-add-building/fast-add-building.component';
import { AddFloorComponent } from './floor/add-floor/add-floor.component';
import { FastAddFloorComponent } from './floor/fast-add-floor/fast-add-floor.component';
import { CheckAxisComponent } from './floor/check-axis/check-axis.component';
import { UpdateFloorComponent } from './floor/update-floor/update-floor.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(buildingFloorRoutes)
  ],
  declarations: [
    BuildingfloorComponent,
    BuildingComponent,
    BuildingListComponent,
    FloorComponent,
    FloorListComponent,
    AddBuildingComponent,
    UpdateBuildingComponent,
    FastAddBuildingComponent,
    AddFloorComponent,
    FastAddFloorComponent,
    CheckAxisComponent,
    UpdateFloorComponent],
  entryComponents: [
    AddBuildingComponent,
    UpdateBuildingComponent,
    FastAddBuildingComponent,
    AddFloorComponent,
    FastAddFloorComponent,
    CheckAxisComponent,
    UpdateFloorComponent],
  providers: [BuildingService]
})
export class BuildingFloorModule { }
