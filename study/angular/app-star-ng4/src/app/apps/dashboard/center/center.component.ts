/*
 * @Author: zsq
 * @Date: 2017-06-7 10:15:17
 * @Last Modified by: 
 * @Last Modified time: 2017-07-11 17:47:20
 * @Desc: 仪表板总视图
 */

import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Subscription } from 'rxjs/RX';
import { GridsterConfig } from 'angular-gridster2';
// model
import { Dashboard } from '../model/dashboard-model';
import { Widget } from '../model/widget-model';
// project
import { Project } from '../../../shared/model/project-model';
// toastr
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// 小部件
import { ProjectinfoComponent } from '../widget/projectinfo/projectinfo.component';
import { MessageComponent } from '../widget/message/message.component';

// local test
import { LocalStorageService } from '../../../shared/service/localStorage.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css'],
})
export class CenterComponent implements OnInit, AfterViewInit {

  private subsrciption: Subscription;
  // local test
  public curPro = new Project();
  // config
  options: GridsterConfig;
  // 当前仪表板
  curDashView: Array<Object>;
  // dash list
  private dashList: Array<Dashboard>;
  private selectDash: Dashboard;
  // widget list

  private widgetList: Array<Object>;
  private selectWidget: Object;
  // test data
  private defaultDashboard = [
    { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
    { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
    { cols: 1, rows: 1, y: 2, x: 6, initCallback: CenterComponent.itemInit }
  ];
  private dashboard2 = [
    { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    { cols: 2, rows: 1, y: 0, x: 0 },
    { cols: undefined, rows: undefined, y: 1, x: 0 },
    { cols: 1, rows: 1, y: undefined, x: undefined },
    { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' },
    { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
  ];
  private addDashboard = [
    { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
    { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
    { cols: 1, rows: 1, y: 2, x: 6, initCallback: CenterComponent.itemInit }
  ];
  static eventStop(item, scope, event) {
    // console.log('eventStop', item, scope);
  }

  static itemChange(item, scope) {
    // console.log('itemChanged', item, scope);
  }

  static itemResize(item, scope) {
    // console.log('itemResized', item, scope);
    // console.log('改变了大小,scope:' + scope);
  }

  static itemInit(item) {
    // console.log('itemInitialized', item);
  }

  // tslint:disable-next-line:member-ordering
  // @ViewChild('myInput') input: ElementRef;
  // tslint:disable-next-line:member-ordering
  // @ViewChild('myDiv') div: ElementRef;

  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private localService: LocalStorageService,
    private el: ElementRef,
    private rd: Renderer
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }


  ngOnInit() {
    this.initDashOptions();
    const pro = JSON.parse(localStorage.getItem('currentProject'));
    if (pro) {
      this.initDashboard();
      this.initWidgets();
    }
    // local-storage 监控
    this.subsrciption = this.localService.getStorage('currentProject').subscribe(latestPro => {
      this.curPro = JSON.parse(latestPro.value);
      this.initDashboard();
      this.initWidgets();
    });
  }
  ngAfterViewInit(): void {
    // this.rd.invokeElementMethod(this.input.nativeElement, 'focus');
    // const ins = this.input.nativeElement.value;
    // console.log('ins:' + ins);
    const inner = `<script>
    function displayDate() {alert("666");}'
    </script>
    <button onclick="displayDate()">点这里</button>
    <p id="zhousan"></p>`;
    // this.div.nativeElement.insertAdjacentHTML('afterbegin', inner);
  }
  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.curDashView.splice(this.curDashView.indexOf(item), 1);
  }

  addItem() {
    const widget = new MessageComponent();
    this.curDashView.push(widget);
  }
  addItem2() {
    const widget = new ProjectinfoComponent();
    this.curDashView.push(widget);
  }
  /**
   * 初始化仪表板参数
   */
  initDashOptions() {
    this.options = {
      gridType: 'fit',
      compactType: 'none',
      itemChangeCallback: CenterComponent.itemChange,
      itemResizeCallback: CenterComponent.itemResize,
      margin: 10,
      outerMargin: true,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 50,
      minItemCols: 1,
      maxItemRows: 50,
      minItemRows: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 250,
      fixedRowHeight: 250,
      draggable: {
        enabled: true,
        stop: CenterComponent.eventStop
      },
      resizable: {
        enabled: true,
        stop: CenterComponent.eventStop
      },
      swap: false,
      displayGrid: 'onDrag&Resize'
    };
  }
  /**
   * 获取当前项目仪表板列表
   */
  initDashboard() {
    console.log('获取项目："' + this.curPro.Name + '"的仪表板');
    // todo:从API获取仪表板列表
    this.dashList = new Array<Dashboard>();
    this.selectDash = new Dashboard();
    // 测试初始化
    const defaultDash = new Dashboard();
    defaultDash.Name = '默认仪表板';
    defaultDash._id = '4c637dbd900f0000000jghif';
    defaultDash.ProjectId = '4c637dbd900f00000000686d';

    const dash1 = new Dashboard();
    dash1.Name = '我的仪表板';
    dash1._id = '4c637dbd900f0000000jghif';
    dash1.ProjectId = '4c637dbd900f00000000686d';
    this.dashList.push(defaultDash);
    this.dashList.push(dash1);
    if (this.dashList) {
      this.selectDash = this.dashList[0];
      this.curDashView = this.defaultDashboard;
    }
    // this.dashboard = [
    //   { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    //   { cols: 2, rows: 1, y: 0, x: 0 },
    //   // { cols: 2, rows: 2, y: 0, x: 2, hasContent: true },
    //   // { cols: 1, rows: 1, y: 0, x: 4 },
    //   // { cols: 1, rows: 1, y: 2, x: 5 },
    //   // { cols: undefined, rows: undefined, y: 1, x: 0 },
    //   // { cols: 1, rows: 1, y: undefined, x: undefined },
    //   // { cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2' },
    //   // { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
    //   // { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    //   // { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
    //   // { cols: 1, rows: 1, y: 2, x: 6, initCallback: CenterComponent.itemInit }
    // ];
    // this.dashboard2 = [
    //   { cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2' },
    //   { cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled' },
    //   { cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled' },
    //   { cols: 1, rows: 1, y: 2, x: 6, initCallback: CenterComponent.itemInit }
    // ];
    // this.currentDash = this.dashboard2;
  }
  /**
   * 初始化小部件list
   */
  initWidgets() {
    this.widgetList = new Array<Object>();
    // todo: 获取小部件列表
    const mes = new Widget();
    mes._id = '4A92BCA6-377D-48C3-9DF3-2CE9446017DD';
    mes.Name = '消息中心';
    const proinfo = new Widget();
    proinfo._id = '4A92BCA6-377D-48C3-9DF3-2CE9446017DF';
    proinfo.Name = '工程概况';
    this.widgetList.push(mes);
    this.widgetList.push(proinfo);
  }
  /**
   * 检测ngModel
   * @param value 选中的仪表板
   */
  onDashChange(value) {
    this.selectDash = value;
    console.log('选中仪表板：' + this.selectDash.Name);
    // todo:从API，将此仪表板中的小部件取出，复制给仪表板视图
    // test data
    this.curDashView = this.dashboard2;
  }
  /**
   * 新增仪表板
   */
  addNewDash() {
    if (this.dashList && this.dashList.length >= 5) {
      this.toastr.info('仪表板不能超过5个！');
    } else {
      // todo: 仪表板的初始化
      const dash = new Dashboard();
      dash.Name = '仪表板' + Math.random();
      dash._id = '4c637dbd900f0000000jghif';
      dash.ProjectId = '4c637dbd900f00000000686d';
      // todo: 1.视图新增；2.API添加
      this.dashList.push(dash);

      // test data
      this.curDashView = this.addDashboard;
      const message = new MessageComponent();
      this.curDashView.push(message);
      // 切换到新增
      this.selectDash = dash;
    }
  }
  /**
   * 添加小部件
   * @param  $event 事件
   * @param item 小部件对象
   */
  addWidget($event, item) {
    // 判定属于哪个小部件
    console.log('小部件的名称：' + item.Name);
    const mes = new MessageComponent();
    if (item._id === mes.WidgetKey) {
      this.curDashView.push(mes);
    }
    const proinfo = new ProjectinfoComponent();
    if (item._id === proinfo.WidgetKey) {
      this.curDashView.push(proinfo);
    }
  }
}
