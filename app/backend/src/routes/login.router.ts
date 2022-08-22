import * as express from 'express';
import LoginController from '../controllers/login.controller';
import JWT from '../utils/jwt';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));
loginRouter.use(JWT.validateToken);
loginRouter.get('/validate', (req, res) => LoginController.validateLogin(req, res));

export default loginRouter;
