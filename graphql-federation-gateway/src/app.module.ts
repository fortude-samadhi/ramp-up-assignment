import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ApolloGateway } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<any>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        serviceList: [
          { name: 'vehicle-maintenance-service', url: 'http://localhost:3001/graphql' },
          { name: 'job-management-service', url: 'http://localhost:3002/graphql' },
        ],
      },
    }),
  ],
})
export class AppModule {}

