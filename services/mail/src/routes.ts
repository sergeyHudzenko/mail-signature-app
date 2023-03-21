/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import SignatureController from './components/signature/signature.controller';
import authMiddleware from './middleware/auth-handler';

/**
 * Register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();

	// Signature Controller
	const signatureController: SignatureController =
		new SignatureController();
	router.use('/api/mail', authMiddleware, signatureController.register());

	return router;
}
