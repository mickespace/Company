/*
 * @Author: zsq 
 * @Date: 2017-06-22 16:14:02 
 * @Last Modified by: 
 * @Last Modified time: 2017-06-28 18:19:58
 * @Desc:工程概况小部件
 */

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-projectinfo-widget',
  templateUrl: './projectinfo.component.html',
  styleUrls: ['./projectinfo.component.css']
})
export class ProjectinfoComponent implements OnInit {

  public WidgetKey = '4A92BCA6-377D-48C3-9DF3-2CE9446017DF';
  public Url = 'http://www.baidu.com';
  constructor() {

  }
  ngOnInit(): void {
  }
}
