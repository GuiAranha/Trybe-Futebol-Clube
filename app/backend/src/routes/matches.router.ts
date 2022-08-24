import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenMiddleware from '../middlewares/token.middleware';

const matchRouter = express.Router();
const matchController = new MatchesController();

matchRouter.get('/', (req, res, next) => matchController.getAllMatches(req, res, next));
matchRouter.post(
  '/',
  tokenMiddleware,
  (req, res, next) => matchController.newMatche(req, res, next),
);
matchRouter.patch('/:id', (req, res, next) => matchController.updateGoals(req, res, next));
matchRouter.patch(
  '/:id/finish',
  tokenMiddleware,
  (req, res, next) => matchController.updateGoals(req, res, next),
);

export default matchRouter;
