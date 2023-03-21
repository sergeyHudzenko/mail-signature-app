import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Config from "../config/config";

export default class TokenDecoder {
    /**
	 *
	 */
    public static async decode(req: Request, res: Response) {
        const token: string = req.headers.authorization;
		let email: string;

		if (!token) {
			res.status(403).json({ message: 'User not authorized' });
			return;
		}

		try {
			const decoded: any = jwt.verify(token.split(' ')[1], Config.jwtSecret);
			email = decoded.email; // the email payload from the JWT

			return email;
		} catch (err) {
			console.error(err);
			if (!token) {
				res.status(500).json({ message: 'Something went wrong' });
				return;
			}
		}
    }
}