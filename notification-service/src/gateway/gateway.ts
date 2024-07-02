import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway  implements OnModuleInit{
  @WebSocketServer()
  server: Server;

  onModuleInit() {
      this.server.on('connection', (socket)=>{
        console.log("socket id : ",socket.id);
        console.log("socket connected!")
      })
  }

  emitMessage(message: string) {
    console.log("emit the socket message >>");
    this.server.emit('message', message);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string  {
    console.log("web socket message", message);
    // this.server.emit('message', message);
    return message;
  }


}
