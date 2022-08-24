import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.services';

export default class TeamController {
  constructor(private teamService = new TeamService()) {
  }

  public async getAllTeams(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const data = await this.teamService.getAllTeams();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public async getTeamById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = Number(req.params.id);
      const data = await this.teamService.getTeamById(id);
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
