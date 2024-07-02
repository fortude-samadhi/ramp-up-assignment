import { Module } from '@nestjs/common';
import { SocketioController } from './socketio.controller';
import { SocketioService } from './socketio.service';
import { GatewayModule } from 'src/gateway/gateway.module';
// import { WebsocketGateway } from 'src/gateway/gateway';


@Module({
  imports: [GatewayModule],
  providers: [SocketioService],
  controllers: [SocketioController]
})
export class SocketioModule {}
