import * as express from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = express.Router();
const teamController = new TeamController();

teamRouter.get('/', (req, res, next) => teamController.getAllTeams(req, res, next));
teamRouter.get('/:id', (req, res, next) => teamController.getTeamById(req, res, next));

export default teamRouter;
