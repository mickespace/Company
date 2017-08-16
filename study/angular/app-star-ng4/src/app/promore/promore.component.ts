/*
 * @Author: zsq 
 * @Date: 2017-08-07 16:54:05 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-07 17:24:53
 *项目列表
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProjectService } from '../shared/service/project.service';
import { LocalStorageService } from '../shared/service/localStorage.service';
import { Project } from '../shared/model/project-model';

@Component({
  selector: 'app-promore',
  templateUrl: './promore.component.html',
  styleUrls: ['./promore.component.css']
})
export class PromoreComponent implements OnInit {
  private proList: Array<Project>;

  constructor(
    private proService: ProjectService,
    private localService: LocalStorageService,
    private tabTitle: Title,
    private router: Router
  ) {
    this.tabTitle.setTitle('项目列表');
    this.proList = new Array<Project>();
  }

  ngOnInit() {
    this.proService.getProjectList('').subscribe((res) => {
      if (res['IsOk']) {
        this.proList = res['Data'];
      }
    });
  }
  // 选中当前项目跳转到 项目概况
  onSelect(event, pro) {
    this.localService.sendStorage('currentProject', JSON.stringify(pro));
    this.router.navigateByUrl('/model/manage');
  }
}
