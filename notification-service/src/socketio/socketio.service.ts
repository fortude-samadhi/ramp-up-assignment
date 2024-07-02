import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/gateway/gateway';

@Injectable()
export class SocketioService {
    constructor(private readonly websocketGateway:WebsocketGateway){}

    async sendNotification(message:string){
      console.log("sendNotification >>>>", message);
      this.websocketGateway.emitMessage(message)
    }
}
