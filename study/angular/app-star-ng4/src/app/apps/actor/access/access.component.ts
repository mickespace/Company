/*
 * @Author: zsq 
 * @Date: 2017-08-11 11:45:56 
 * @Last Modified by: zsq
 * @Last Modified time: 2017-08-11 16:51:54
 */
import { Component, OnInit } from '@angular/core';
import { AccessService } from '../service/access.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  constructor(
    private accessService: AccessService
  ) { }

  ngOnInit() {
  }

}
