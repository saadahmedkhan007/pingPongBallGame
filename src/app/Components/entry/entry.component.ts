import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  constructor() {}
  imageQR: string = '';
  roomId: any;
  ngOnInit(): void {
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
