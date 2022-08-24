import Matches from '../database/models/matches';
import Teams from '../database/models/team';
import IMatches from '../interfaces/IMatches';
import BaseError from '../utils/baseError';

export default class MatchesService {
  constructor(private model = Matches) {
    this.model = model;
  }

  public async getAllMatches(): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    }) as unknown as IMatches[];
    return data;
  }

  public async newMatch(match: IMatches): Promise<IMatches | void> {
    if (match.homeTeam === match.awayTeam) {
      throw new BaseError(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeam = await Teams.findOne({ where: { id: match.homeTeam } });
    const awayTeam = await Teams.findOne({ where: { id: match.awayTeam } });

    if (!homeTeam || !awayTeam) {
      throw new BaseError(404, 'There is no team with such id!');
    }

    const data = await this.model.create(({ ...match, inProgress: false }));
    console.log(data);
    return data;
  }

  public async updateInProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateGoals(id: number, data: object): Promise<void> {
    await this.model.update({ ...data }, { where: { id } });
  }
}
