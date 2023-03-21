/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../config/config';

const authMiddleware = (
	req: Request | any,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			message: 'Authorization header not found',
		});
	}

	const token = authHeader.split(' ')[1];

	try {
		const decodedToken: any = jwt.verify(token, Config.jwtSecret);
		req.userData = decodedToken;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Invalid or expired token',
			error,
		});
	}
};

export default authMiddleware;
