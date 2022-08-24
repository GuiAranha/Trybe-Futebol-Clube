import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import ITeam from '../interfaces/ITeam';
import Teams from '../database/models/team';

chai.use(chaiHttp);

const { expect } = chai;

const teams: ITeam[] = [
  {
    id: 1,
    teamName: 'team',
  },
  {
    id: 2,
    teamName: 'team2',
  },
]

describe('Teste de Login', () => {

  afterEach(()=>{
    sinon.restore();
  })

  it('return code 200 after list all teams', async () => {
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    // console.log(body);
    expect(body).to.be.deep.eq(teams);
  });

  it('return code 200 after list one team', async () => {
    sinon.stub(Teams, 'findOne').resolves(teams[1] as Teams);
    const { status, body } = await chai.request(app).get('/teams/2');
    expect(status).to.be.eq(200);
    // console.log(body.id);
    expect(body.id).to.be.eq(2);
  });

  it('return code 404 after list one team that dont exist', async () => {
    sinon.stub(Teams, 'findOne').resolves(teams[2] as Teams);
    const { status, body } = await chai.request(app).get('/teams/3');
    expect(status).to.be.eq(404);
    // console.log(body, status);
    expect(body.message).to.be.eq('Team not found');
  });
});
