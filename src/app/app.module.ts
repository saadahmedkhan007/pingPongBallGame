import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './Components/entry/entry.component';
import { GamePageComponent } from './Components/game-page/game-page.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
  declarations: [AppComponent, EntryComponent, GamePageComponent],
  imports: [BrowserModule, AppRoutingModule, NgxScannerQrcodeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
