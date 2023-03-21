import App from '../../src/App';
import logger from '../../src/lib/logger';
import { setGlobalEnvironment } from '../../src/global';
import Environment from '../../src/environments/environment';
import { Environments } from '../../src/environments/environment.constant';
import { Application } from 'express';

export default class IntegrationHelpers {
	public static appInstance: Application;

	public static async getApp(): Promise<Application> {
		if (this.appInstance) {
			return this.appInstance;
		}
		const env: Environment = new Environment(Environments.TEST);
		setGlobalEnvironment(env);
		const app: App = new App();
		await app.init();
		this.appInstance = app.express;

		return this.appInstance;
	}

	public clearDatabase(): void {
		logger.info('clear the database');
	}
}
