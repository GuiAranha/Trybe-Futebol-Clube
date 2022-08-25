import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/matches';
import ILeaderboard from '../interfaces/ILeaderboard';
import TeamService from './team.services';
import Teams from '../database/models/team';
import { ranking, formattedLeaderboard } from '../utils/leaderboard.utils';

export default class LeaderboardService {
  constructor(private model = Matches) {
    this.model = model;
  }

  findMatches = async (id:number) => {
    const matches = await this.model.findAll({
      where: { inProgress: false, homeTeam: id },
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    }) as IMatches[];
    return matches;
  };

  public async loadHomeBoard(): Promise<ILeaderboard[]> {
    const teamService = new TeamService();
    const allTeams = await teamService.getAllTeams();
    const teams = await Promise.all(allTeams.map(async (item: any) => {
      const matches = await this.findMatches(item.id);
      return { teamName: item.teamName, matches };
    }));

    const generateLeaderboard = teams.map(
      ({ teamName, matches }) => formattedLeaderboard(teamName, matches),
    );

    return ranking(generateLeaderboard);
  }
}
