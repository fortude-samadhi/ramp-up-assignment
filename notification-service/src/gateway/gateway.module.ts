import { Module } from '@nestjs/common';
import { WebsocketGateway } from './gateway';

@Module({
    providers:[WebsocketGateway],
    exports:[WebsocketGateway]
})
export class GatewayModule {}
