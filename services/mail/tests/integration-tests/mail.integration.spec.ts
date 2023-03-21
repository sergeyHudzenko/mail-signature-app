import 'jest';
import { Application } from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('Mail integration tests', () => {
	let app: Application;
	const contentType: string = 'text/html; charset=utf-8';

	beforeAll(async () => {
		app = await IntegrationHelpers.getApp();
	});

	it('can get response from /api/mail/signature', async () => {
		await request(app)
			.post('/api/mail/signature')
			.set('Accept', 'application/json')
			.send({
				fullName: 'fullName',
				title: 'title',
				company: 'company',
				email: 'email@email.email',
				phone: 'phone',
				address: 'address',
				layout: 1,
				user_id: 1,
			})
			.expect('Content-Type', contentType)
			.expect(StatusCodes.OK);
	});

    it('can get html from /api/mail/signature/render', async () => {
		await request(app)
			.post('/api/mail/signature/render')
			.set('Accept', 'application/json')
			.send({
				fullName: 'fullName',
				title: 'title',
				company: 'company',
				email: 'email@email.email',
				phone: 'phone',
				address: 'address',
				layout: 1
			})
			.expect('Content-Type', contentType)
			.expect(StatusCodes.OK);
	});
});
