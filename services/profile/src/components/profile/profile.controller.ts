/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-constructor */
import { Request, Response, Router } from 'express';
import BaseApi from '../BaseApi';
import TokenDecoder from '../../utils/token-decoder';
import additionalCors from '../../utils/cors';
import Users from '../../models/users';

export default class ProfileController extends BaseApi {
	/**
	 *
	 */
	constructor() {
		super();
	}

	/**
	 *
	 */
	public register(): Router {
		this.router.get('/user', this.getUser.bind(this));

		return this.router;
	}

	/**
	 *
	 */
	public async getUser(req: Request, res: Response): Promise<void> {
		additionalCors(res);
		try {
			const email = await TokenDecoder.decode(req, res)
			const user = await Users.getUserByEmail(email);
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}

			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}
