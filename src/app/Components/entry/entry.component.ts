import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  @Input('scanner') action: any;
  browserdet = false;
  constructor(private window: Window) {}
  imageQR: string = '';
  roomId: any;
  ngOnInit(): void {
    console.log(this.action);

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.browserdet = true;
      console.log('mobile' + this.browserdet);
    } else {
      this.browserdet = false;
      console.log('notmobile' + this.browserdet);
    }
    this.generateQR();
  }
  private _generateQR = async () => {
    const text = 'hey google';
    this.roomId = text;

    try {
      this.imageQR = await QRCode.toDataURL(text);
      console.log(this.imageQR);
    } catch (err) {
      console.error(err);
    }
  };
  public get generateQR() {
    return this._generateQR;
  }
  public set generateQR(value) {
    this._generateQR = value;
  }
}
