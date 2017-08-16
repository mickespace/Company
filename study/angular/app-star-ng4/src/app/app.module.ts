import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { AppComponent } from './app.component';
// Angular Material
import { MaterialModule } from '@angular/material';
// Angular Primeng
import { TabViewModule, InputTextModule, InputTextareaModule, DropdownModule } from 'primeng/primeng';
// primeng
import { AccordionModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
// web strategy
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
// toast
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CustomOption } from './shared/model/custom-option-model';

// routes
import { appRoutes } from './app.routes';
// custom component
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { SetDialog } from './set/set.dialog';
// import service
import { BaseService } from './shared/service/base.service';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { LocalStorageService } from './shared/service/localStorage.service';
import { UserService } from './shared/service/user.service';
import { ConfigService } from './shared/service/config.service';
import { ProjectService } from './shared/service/project.service';
import { WebSocketService } from './shared/service/web-socket.service';
// pipe
import { SafeHtmlPipe } from './shared/pipe/safehtml.pipe';
import { SexReform } from './shared/pipe/sex.pipe';
import { FilesizeTran } from './shared/pipe/filesize.pipe';
// component
import { HomeComponent } from './home/home.component';
import { CreateProComponent } from './dialog/create-pro/create-pro.component';
import { PromoreComponent } from './promore/promore.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    HomeComponent,
    SafeHtmlPipe,
    SexReform,
    FilesizeTran,
    SetDialog,
    CreateProComponent,
    PromoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    // primeng
    AccordionModule,
    DialogModule,
    ButtonModule,
    ChartModule,
    CommonModule,
    FileUploadModule
  ],
  providers: [
    Title,
    BaseService,
    AuthGuardService,
    LocalStorageService,
    UserService,
    ConfigService,
    ProjectService,
    WebSocketService,
    { provide: APP_BASE_HREF, useValue: '/' },
    // 防止刷新丢失页面
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ToastOptions, useClass: CustomOption }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SetDialog,
    CreateProComponent
  ]
})
export class AppModule { }
