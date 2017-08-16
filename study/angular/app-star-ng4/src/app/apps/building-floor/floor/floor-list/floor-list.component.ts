import { Component, Input, Output, OnInit } from '@angular/core';
import { Floor } from '../../models/floor';
@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  _floors: Floor[] = [];
  @Input()
  set floors(floors: Floor[]) {
    if (floors !== null) {
      this._floors = [...floors];
    }
  }
  get floors() {
    return this._floors;
  }

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    const mess = event;
  }

  onChooseAllFloors(event) {
    this._floors.forEach(t => {
      t.IsSelected = event;
    });
  }

}
