import Teams from '../database/models/team';
import ITeam from '../interfaces/ITeam';
import BaseError from '../utils/baseError';

export default class TeamService {
  constructor(private model = Teams) {
    this.model = model;
  }

  public async getAllTeams(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data;
  }

  public async getTeamById(id: number): Promise<ITeam | void> {
    const data = await this.model.findOne({ where: { id } });
    if (!data) throw new BaseError(404, 'Team not found');
    return data;
  }
}
