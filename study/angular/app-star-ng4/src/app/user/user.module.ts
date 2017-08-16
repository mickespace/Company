import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MaterialModule } from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule, MdDialogModule } from '@angular/material';
import { userRoutes } from './user.routes';
import { CenterComponent } from './center/center.component';
import { InfoComponent } from './info/info.component';
import { SecurityComponent } from './security/security.component';
import { AppComponent } from './app/app.component';
import { PwdDialog } from './security/pwd/pwd.dialog';
import { BindComponent } from './security/bind/bind.component';
// pipe
import { UserTypeTrans } from './pipe/userType.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdDialogModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    CenterComponent,
    InfoComponent,
    SecurityComponent,
    AppComponent,
    PwdDialog,
    BindComponent,
    UserTypeTrans
  ],
  entryComponents: [
    PwdDialog,
    BindComponent
  ]
})
export class UserModule { }
