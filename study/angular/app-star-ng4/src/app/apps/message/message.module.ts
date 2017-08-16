import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { messageRoutes } from './message.routes';
import { MessageService } from './service/message.service';
import { MaterialModule } from '@angular/material';
import { DetailDialog } from './detail/detail.dialog';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(messageRoutes),
  ],
  declarations: [MainComponent, DetailDialog],
  entryComponents: [DetailDialog],
  providers: [MessageService]
})
export class MessageModule { }
