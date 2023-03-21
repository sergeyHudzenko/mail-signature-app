/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import * as amqp from 'amqplib/callback_api';

class MessageBus {
	private connection: any;

	private channel: any;

	private exchange: string;

	private queueName: string;

	constructor(exchange: string, queueName: string) {
		this.exchange = exchange;
		this.queueName = queueName;
	}

	public async connect() {
		return new Promise<void>((resolve, reject) => {
			amqp.connect('amqp://localhost', (error, connection) => {
				if (error) {
					console.error('Error connecting to RabbitMQ:', error);
					return reject(error);
				}

				console.log('Connected to RabbitMQ');

				this.connection = connection;
				this.createChannel().then(() => {
					resolve();
				});
			});
		});
	}

	public async sendToQueue(message: any) {
		await this.channel.assertQueue(this.queueName);
		this.channel.sendToQueue(
			this.queueName,
			Buffer.from(JSON.stringify(message)),
		);
		console.log(`Message sent to ${this.queueName}`);
	}

	public async consumeQueue(callback: (message: any) => Promise<void>) {
		console.log('this.queueName', this.queueName);
		await this.channel.assertQueue(this.queueName);
		console.log(`Waiting for messages from ${this.queueName}`);

		this.channel.consume(this.queueName, (message: any) => {
			if (message !== null) {
				console.log(`Message received from ${this.queueName}`);
				callback(JSON.parse(message.content.toString()))
					.then(() => this.channel.ack(message))
					.catch((error: any) => {
						console.error('Error processing message:', error);
						this.channel.reject(message, false);
					});
			}
		});
	}

	private createChannel() {
		return new Promise<void>((resolve, reject) => {
            this.connection.createChannel((error: any, channel: any) => {
                if (error) {
                    console.error('Error creating channel:', error);
                    reject();
                    return;
                }

                console.log('Channel created');

                channel.assertExchange(this.exchange, 'fanout', {
                    durable: false,
                });
                this.channel = channel;
                resolve();
            });
        });
	}

	public async closeConnection() {
		console.log('Closing RabbitMQ connection');
		await this.connection.close();
	}
}

export default MessageBus;
