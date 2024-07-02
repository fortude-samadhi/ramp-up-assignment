import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
import { ButtonModule } from 'primeng/button';

import { ImportComponent } from './import/import.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // SocketIoModule.forRoot(config),
    ButtonModule,
    HttpClientModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [MessageService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
