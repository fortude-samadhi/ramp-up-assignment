// import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {
//   constructor(private socket: Socket) {}

//   sendMessage(msg: string) {
//     this.socket.emit('message', msg);
//   }

//   getMessage() {
//     return this.socket.fromEvent('message');
//   }
// }

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor(
    // private toastr: ToastrService
  ) {
    this.socket = io('http://localhost:3004');
    this.socket.on('message', (message: string) => {
      // this.toastr.success(message, 'New Message');
      console.log("web socket message >>", message);
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}
