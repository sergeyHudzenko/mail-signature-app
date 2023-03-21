/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import DB from './database/database';
import addErrorHandler from './middleware/error-handler';
import registerRoutes from './routes';

export default class App {
	public express: express.Application;

	public httpServer: http.Server;

	public async init(): Promise<void> {
		this.express = express();
		this.httpServer = http.createServer(this.express);

		// Initialization of Database instance and append initial schema to DB
		DB.instance()
			.createPool()
			.then(() => DB.instance().initialSchema())
			.then(() => {
				// add all global middleware like cors
				this.middleware();

				// // register the all routes
				this.routes();

				// add the middleware to handle error, make sure to add if after registering routes method
				this.express.use(addErrorHandler);

				// In a development/test environment, Swagger will be enabled.
				

			});
	}

	/**
	 * here register your all routes
	 */
	private routes(): void {
		this.express.use('/', registerRoutes());
	}

	/**
	 * here you can apply your middlewares
	 */
	private middleware(): void {
		// support application/json type post data
		// support application/x-www-form-urlencoded post data
		// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
		this.express.use(helmet({ contentSecurityPolicy: false }));
		this.express.use(express.json({ limit: '100mb' }));
		this.express.use(
			express.urlencoded({ limit: '100mb', extended: true }),
		);
		
		// add multiple cors options as per your use
		const corsOptions = {
			origin: ['http://localhost:8080', 'http://localhost:30000', 'http://127.0.0.1:30000', 'http://localhost:30003', 'http://127.0.0.1:30003',  'http://127.0.0.1:3146'],
		};
		this.express.use(cors(corsOptions));
	}

	private parseRequestHeader(
		req: express.Request,
		res: express.Response,
		next: Function,
	): void {
		// parse request header
		// console.log(req.headers.access_token);
		next();
	}

	private basePathRoute(
		request: express.Request,
		response: express.Response,
	): void {
		response.json({ message: 'base path' });
	}

	
}
