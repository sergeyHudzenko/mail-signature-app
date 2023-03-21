/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../../config/config';
import DB from '../../database/database';
import additionalCors from '../../utils/cors';
import BaseApi from '../BaseApi';

export default class AuthController extends BaseApi {
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
		this.router.post('/sign-in', this.signIn.bind(this));
		this.router.post('/sign-up', this.signUp.bind(this));
		this.router.post('/token', this.authorize.bind(this));

		return this.router;
	}

	/**
	 *
	 */
	async signUp(req: Request, res: Response) {
		const { email, password, fullname } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		additionalCors(res);

		try {
			await DB.client.query('BEGIN');
			await DB.client.query(
				'INSERT INTO users(email, password, fullname) VALUES($1, $2, $3)',
				[email, hashedPassword, fullname],
			);
			await DB.client.query('COMMIT');

			const token = jwt.sign({ email }, Config.jwtSecret);
			
			res.json({ token });
		} catch (error) {
			console.error(error.message);
			await DB.client.query('ROLLBACK');
			res.status(500).json({ message: 'Failed to create user' });
		}
	}

	/**
	 *
	 */
	async signIn(req: Request, res: Response) {
		const { email, password } = req.body;

		additionalCors(res);

		try {
			const result = await DB.client.query(
				'SELECT * FROM users WHERE email = $1',
				[email],
			);
			const user = result.rows[0];

			if (!user) {
				return res
					.status(401)
					.json({ message: 'Authentication failed' });
			}

			const isValidPassword = await bcrypt.compare(
				password,
				user.password,
			);

			if (isValidPassword) {
				const token = jwt.sign({ email }, Config.jwtSecret);
				res.json({ token });
			} else {
				res.status(401).json({ message: 'Authentication failed' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Authentication failed' });
		}
	}

	/**
	 *
	 */
	async authorize(
		req: Request,
		res: Response,
	) {
		const authHeader = req.headers.authorization;

		additionalCors(res);
		
		if (!authHeader) {
			return res.status(401).json({
				message: 'Authorization header not found',
			});
		}

		const token = authHeader.split(' ')[1];

		try {
			const decodedToken: any = jwt.verify(token, Config.jwtSecret);
			return res.status(200).json({ token: decodedToken });
			
		} catch (error) {
			return res.status(401).json({
				message: 'Invalid or expired token',
				error,
			});
		}
	}
}
