import { AuthenticationService } from '../middleware/authentication';
import { UserController } from '../controller/UserController';
import express from 'express';
const router = express.Router();
const userController = new UserController()
const authentication = new AuthenticationService()

router.post('/login',  userController.login);
router.post('/create', userController.createUser);

module.exports = router;
export default router;