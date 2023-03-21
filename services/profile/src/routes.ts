/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import ProfileController from './components/profile/profile.controller';
import authMiddleware from './middleware/auth-handler';

/**
 * Register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();

	// Signature Controller
	const profileController: ProfileController =
		new ProfileController();
	router.use('/api/profile', authMiddleware, profileController.register());

	return router;
}
