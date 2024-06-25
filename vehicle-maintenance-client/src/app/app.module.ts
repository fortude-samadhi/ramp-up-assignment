import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
import { ButtonModule } from 'primeng/button';

import { ImportComponent } from './import/import.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ImportService } from 'src/app/import/import.service';

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    ButtonModule,
    HttpClientModule,
    NgxFileDropModule,
  ],
  providers: [ImportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
