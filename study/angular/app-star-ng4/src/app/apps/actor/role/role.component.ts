/*
 * @Author: zsq 
 * @Date: 2017-08-10 20:29:43 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-11 16:52:11
 */

import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/RX';
// service
import { LocalStorageService } from '../../../shared/service/localStorage.service';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  private curProject = JSON.parse(localStorage.getItem('currentProject'));
  private sub = new Subscription();
  constructor(
    private roleService: RoleService,
    private localService: LocalStorageService
  ) { }

  ngOnInit() {
    // watch
    this.sub = this.localService.getStorage('currentProject').subscribe(res => {
      this.curProject = JSON.parse(res.value);
      // todo something

    });
  }

}
