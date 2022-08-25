import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {
  }

  public async loadHomeBoard(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const leaderboard = await this.leaderboardService.loadHomeBoard();
      console.log(leaderboard);
      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}
