import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class NotificationService {

    private client: ClientProxy;
    constructor(){
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              host: '127.0.0.1',
              port: 3003,
            },
          });
    }

    async sendNotificationToClient(data:any){
        return this.client.send({ cmd: 'notify' }, data).toPromise();
    }
}
