import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {
  }

  public async getAllMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const data = await this.matchesService.getAllMatches();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public async newMatche(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const match = req.body;
      const data = await this.matchesService.newMatch(match);
      return res.status(201).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  public async updateInProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);
      await this.matchesService.updateInProgress(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  public async updateGoals(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);
      const match = req.body;
      await this.matchesService.updateGoals(id, match);
      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
