import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  private curProId = JSON.parse(localStorage.getItem('currentProject'))._id;
  private newCode = '';
  private memberStr: string;
  constructor(
    private vcf: ViewContainerRef,
    private toastr: ToastsManager,
    private memberService: MemberService
  ) {
    this.toastr.setRootViewContainerRef(vcf);
  }

  ngOnInit() {
  }

  onNewCode() {

    this.memberService.getInviteCode(this.curProId).subscribe(res => {
      if (res) {
        this.newCode = res['Data'].InviteCode;
      } else {
        this.toastr.error(res['Message']);
      }
    });
  }
  /**
   * 批量邀请
   */
  onInvite() {
    const memberList = new Array();
    const memObj = this.memberStr.split(/\n\r?/g);
    memObj.forEach(mem => {
      if (mem !== '' && mem !== null) {
        memberList.push(mem.trim());
      }
    });
    if (memberList.length > 0) {
      this.memberService.inviteMembers(this.curProId, JSON.stringify(memberList)).subscribe(res => {
        if (res) {
          this.memberStr = '';
          this.toastr.success('已邀请成功，等待对方处理！');
        } else {
          this.toastr.error(res['Message']);
        }
      });
    } else {
      this.toastr.info('您输入的欲邀请成员为空！');
      this.memberStr = '';
    }
  }
}
