import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Building } from '../../models/building';
@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {

  _buildings: Building[] = [];
  //_currentBuildingId: string = null;

  @Input()
  set buildings(buildings: Building[]) {
    if (buildings !== null) {
      this._buildings = [...buildings];
    }
  }
  get buildings() {
    return this._buildings;
  }

  @Output()
  changeBuilding: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onChangeBuilding(event) {
    const array = this._buildings.filter(t => t.IsSelected);
    if (array.length !== 1) {
      //this._currentBuildingId = null;
      this.changeBuilding.emit('');
      return;
    }
    //const t = event;
    //this._currentBuildingId = array[0]._id;
    this.changeBuilding.emit(array[0]._id);
  }

  onChooseAllBuildings(event) {
    this._buildings.forEach(t => {
      t.IsSelected = event;
    });
  }

}

