import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the main app
  const app = await NestFactory.create(AppModule);
  
  // Create the microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3003,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3004);
}

bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   await app.listen(3004);
// }
// bootstrap();
