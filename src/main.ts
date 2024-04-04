import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Consumer config
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'log-consumer',
      },
    },
  });
  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:29092'],
  //     },
  //     consumer: {
  //       groupId: 'log-consumer2',
  //     },
  //   },
  // });
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
