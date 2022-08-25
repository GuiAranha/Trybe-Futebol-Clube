import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';

const totalGoalsFavor = (teamMatches: IMatches[]) => {
  const goalsFavor = teamMatches.reduce((acc: number, curr: IMatches) =>
    acc + curr.homeTeamGoals, 0);
  return goalsFavor;
};

const totalGoalsOwn = (teamMatches: IMatches[]) => {
  const goalsOwn = teamMatches.reduce((acc: number, curr: IMatches) =>
    acc + curr.awayTeamGoals, 0);
  return goalsOwn;
};

const totalLosses = (teamMatches: IMatches[]) => {
  const losses = teamMatches.reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return losses;
};

const totalVictories = (teamMatches: IMatches[]) => {
  const victories = teamMatches.reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return victories;
};

const totalDraws = (teamMatches: IMatches[]) => {
  const draws = teamMatches.reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return draws;
};

const totalPoints = (teamMatches: IMatches[]) => {
  const points = teamMatches.reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

const ranking = (arrayTeams: any) => {
  const rank = arrayTeams.sort((team1: ILeaderboard, team2: ILeaderboard) => {
    if (team1.totalPoints > team2.totalPoints) return -1;
    if (team1.totalPoints < team2.totalPoints) return 1;
    if (team1.totalVictories > team2.totalVictories) return -1;
    if (team1.totalVictories < team2.totalVictories) return 1;
    if (team1.goalsBalance > team2.goalsBalance) return -1;
    if (team1.goalsBalance < team2.goalsBalance) return 1;
    if (team1.goalsFavor > team2.goalsFavor) return -1;
    if (team1.goalsFavor < team2.goalsFavor) return 1;
    if (team1.goalsOwn > team2.goalsOwn) return -1;
    if (team1.goalsOwn < team2.goalsOwn) return 1;

    return 0;
  });
  return rank;
};

const formattedLeaderboard = (team: string, matches: any) => ({
  name: team,
  totalPoints: totalPoints(matches),
  totalGames: matches.length,
  totalVictories: totalVictories(matches),
  totalDraws: totalDraws(matches),
  totalLosses: totalLosses(matches),
  goalsFavor: totalGoalsFavor(matches),
  goalsOwn: totalGoalsOwn(matches),
  goalsBalance: totalGoalsFavor(matches) - totalGoalsOwn(matches),
  efficiency: ((totalPoints(matches) / (matches.length * 3)) * 100).toFixed(2),
});

export { formattedLeaderboard, ranking };
