/*
 * @Author: zsq 
 * @Date: 2017-06-22 17:52:10 
 * @Last Modified by: 
 * @Last Modified time: 2017-07-04 16:54:42
 * @Desc:消息中心小部件
 */

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-widget',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

    public widgetContent = '<div style="color:red; font-size:16px; margin-top:20px;">我是html返回过来的内容<br>' +
    '<button onclick="this.innerHTML = Date()">我是按钮哦</button></div>';
    public test = '<script>alert("evil never sleeps")</script>';
    public boot = '<div class="row" style="padding:20px;"><div class="col-md-6" style="border:1px solid red">sfdfdsf</div>'
    + '<div class="col-md-6" style="border:1px solid red">fdsfdsfsd</div></div>';
    public btn2 = '<script>'
    + 'function displayDate() {document.getElementById("zhousan").innerHTML = Date();}'
    + '</script>'
    + '<button onclick="displayDate()">点这里</button>'
    + '<p id="zhousan"></p>';
    public WidgetKey = '4A92BCA6-377D-48C3-9DF3-2CE9446017DD';

    constructor() {
    }

    ngOnInit(): void {
    }
}