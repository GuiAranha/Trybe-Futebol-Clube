import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', (req, res, next) =>
  leaderboardController.loadHomeBoard(req, res, next));

export default leaderboardRouter;
