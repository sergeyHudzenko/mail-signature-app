import { Router } from 'express';
import AuthController from './components/auth-service/auth.controller';

/**
 * Here, you can register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();
	
	// Authorization & Authentification
	const authController: AuthController =
		new AuthController();
	router.use('/api/auth', authController.register());

	return router;
}
