/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-constructor */
import { Request, Response, Router } from 'express';
import validator from 'validator';
import MailTemplates from '../../templates/mail-templates';
import BaseApi from '../BaseApi';
import RenderEngine from '../render-engine/render-engine.controller';
import Users from '../../models/Users';
import Signatures from '../../models/Signatures';
import TokenDecoder from '../../utils/token-decoder';
import additionalCors from '../../utils/cors';

export default class SignatureController extends BaseApi {
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
		this.router.post('/signature', this.saveSignature.bind(this));
		this.router.post(
			'/signature/render',
			this.renderSignatureOutside.bind(this),
		);
		this.router.get('/signatures', this.getSignatures.bind(this));
		this.router.get('/signature', this.getSignature.bind(this));
		this.router.delete('/signature', this.removeSignature.bind(this));

		return this.router;
	}

	/**
	 *
	 */
	async saveSignature(req: Request, res: Response) {
		const { fullName, title, company, email, phone, address, layout } =
			req.body;

		// Validate input fields
		const errors = [];
		if (!fullName) {
			errors.push({
				code: 'REQUIRED_FIELD',
				field: 'fullName',
				message: 'Full name is a mandatory field',
			});
		}
		if (!email) {
			errors.push({
				code: 'REQUIRED_FIELD',
				field: 'email',
				message: 'Email is a mandatory field',
			});
		} else if (!validator.isEmail(email)) {
			errors.push({
				code: 'INVALID_FIELD_FORMAT',
				field: 'email',
				message: 'Email must be in the correct format',
			});
		}

		if (errors.length > 0) {
			res.status(400).json({ errors });
			return;
		}

		const userEmail = await TokenDecoder.decode(req, res);
		const user = await Users.getUserByEmail(userEmail);

		const render = await this.renderSignatureInside({
			fullName,
			title,
			company,
			email,
			phone,
			address,
			layout,
			user_id: user.user_id,
		});

		Signatures.save(
			fullName,
			title,
			company,
			email,
			phone,
			address,
			layout,
			user.user_id,
			render,
		).then((data) => {
			additionalCors(res);
			res.status(200).json({
				message: 'Mail signature setting up succesfuly',
				data: {
					fullName,
					title,
					company,
					email,
					phone,
					address,
					layout,
					user_id: user.user_id,
					render,
				},
			});
		});
	}

	/**
	 *
	 */
	public async getSignature(req: Request, res: Response): Promise<void> {
		additionalCors(res);
		try {
			const { id } = req.query;
			if (!id) {
				res.status(404).json({ message: 'Entity not found' });
				return;
			}

			const singature = Signatures.getSignatureById(id as any);
			if (!singature) {
				res.status(404).json({ message: 'Signature not found' });
				return;
			}
			res.json(singature);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	/**
	 *
	 */
	public async getSignatures(req: Request, res: Response): Promise<void> {
		additionalCors(res);
		try {
			const email = await TokenDecoder.decode(req, res);
			const user = await Users.getUserByEmail(email);
			const signatures = await Signatures.getSignaturesByUserId(
				user.user_id,
			);
			if (!signatures) {
				res.status(404).json({ message: 'Signatures not found' });
				return;
			}

			res.json(signatures);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	/**
	 *
	 */
	public async removeSignature(req: Request, res: Response): Promise<void> {
		const { id } = req.body;
		additionalCors(res);
		try {
			await Signatures.removeSignature(id)
			console.log(123)
			res.status(200).json({ message: 'Removed succesfully' });
		} catch (error) {
			console.error({ message: 'Internal server error' });
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	/**
	 *
	 */
	async renderSignatureOutside(req: Request, res: Response) {
		const { fullName, title, company, email, phone, address, layout } =
			req.body;

		const engine = new RenderEngine(
			layout === 1
				? MailTemplates.mailTemplate1
				: MailTemplates.mailTemplate2,
		);
		const html = await engine.render({
			fullName,
			title,
			company,
			email,
			phone,
			address,
			layout,
		});

		additionalCors(res);
		res.status(200).json({ html });
	}

	/**
	 *
	 */
	async renderSignatureInside(data: any) {
		const { fullName, title, company, email, phone, address, layout } =
			data;

		const engine = new RenderEngine(
			layout == 1
				? MailTemplates.mailTemplate1
				: MailTemplates.mailTemplate2,
		);
		const html = await engine.render({
			fullName,
			title,
			company,
			email,
			phone,
			address,
			layout,
		});

		return html;
	}
}
