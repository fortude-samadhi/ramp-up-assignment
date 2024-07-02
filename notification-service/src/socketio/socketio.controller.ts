import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SocketioService } from './socketio.service';

@Controller('socketio')
export class SocketioController {
    constructor(private readonly socketioService: SocketioService){}

    @MessagePattern({ cmd: 'notify' })
    notify(data: any): string {
      console.log('Notification received:', data);
      this.socketioService.sendNotification("mee")
      return 'Notification sent successfully';
    }

}
