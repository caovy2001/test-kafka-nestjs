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
        brokers: ['172.18.0.3:9092'],
      },
      consumer: {
        groupId: 'log-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
