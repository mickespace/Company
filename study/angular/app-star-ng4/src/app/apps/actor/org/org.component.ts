/*
 * @Author: zsq 
 * @Date: 2017-08-10 20:29:33 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-11 16:52:05
 */

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/RX';
// service
import { LocalStorageService } from '../../../shared/service/localStorage.service';
import { OrgService } from '../service/org.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {

  private curProject = JSON.parse(localStorage.getItem('currentProject'));
  private sub = new Subscription();
  constructor(
    private orgService: OrgService,
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
