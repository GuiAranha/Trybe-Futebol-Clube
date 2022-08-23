import * as express from 'express';
import LoginController from '../controllers/login.controller';
// import JWT from '../utils/jwt';
import tokenMiddleware from '../middlewares/token.middleware';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));
loginRouter.use(tokenMiddleware);
loginRouter.get('/validate', (req, res) => LoginController.validateLogin(req, res));

export default loginRouter;
