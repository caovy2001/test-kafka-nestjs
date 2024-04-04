import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Kafka, KafkaConfig } from 'kafkajs';

@Controller()
export class AppController {
  private kafka: Kafka;
  constructor() {
    const kafkaConfig: KafkaConfig = {
      clientId: 'my-app',
      brokers: ['localhost:29092'], // Your Kafka broker(s) configuration
    };
    this.kafka = new Kafka(kafkaConfig);
  }

  @Get('/produce')
  async produceMessage(): Promise<void> {
    const topic = 'my-first-topic';
    const message = 'Hello Kafka!';
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }

  @MessagePattern('my-first-topic', { groupId: 'log-consumer' }) // Our topic name
  getHello2(@Payload() message) {
    console.log(message);
    return 'Hello World';
  }

  // @MessagePattern('my-first-topic', { groupId: 'log-consumer2' }) // Our topic name
  // getHello22(@Payload() message) {
  //   console.log(message + ' 2');
  //   return 'Hello World';
  // }
}
