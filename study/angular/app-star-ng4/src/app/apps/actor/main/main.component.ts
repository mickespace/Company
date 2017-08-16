/*
 * @Author: zsq
 * @Date: 2017-08-10 16:12:28
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-10 20:28:00
 *人员组织 component
 */

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/RX';
import { Title } from '@angular/platform-browser';
// service
import { LocalStorageService } from '../../../shared/service/localStorage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private curProject = JSON.parse(localStorage.getItem('currentProject'));
  private subscription = new Subscription();
  constructor(
    private title: Title,
    private localService: LocalStorageService
  ) {
    this.title.setTitle('人员组织');
  }

  ngOnInit() {
    // subscript 监听项目变化
    this.subscription = this.localService.getStorage('currentProject').subscribe(res => {
      this.curProject = JSON.parse(res.value);
    });
  }
}
