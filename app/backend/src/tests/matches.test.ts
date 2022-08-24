import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import IMatches from '../interfaces/IMatches';
import IUser from '../interfaces/IUser';
import Matches from '../database/models/matches';
import JWT from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

const newMatch = {
  homeTeam: 1,
  awayTeam: 2,
  homeTeamGoals: 1,
  awayTeamGoals: 2,
}

const user: IUser = {
  id: 1,
  username: 'username',
  role: 'admin',
  email: 'email@gmail.com',
  password: 'password',
}

const matches: IMatches[] =[
  {
    id: 1,
    homeTeam: 2,
    homeTeamGoals: 3,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false
  },
  {
    id: 2,
    homeTeam: 10,
    homeTeamGoals: 1,
    awayTeam: 11,
    awayTeamGoals: 1,
    inProgress: false
  },
]

describe('Teste de Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

   /* beforeEach(() => {
     sinon
       .stub(Users, 'findOne')
       .resolves(user as Users);
  }); */

  afterEach(()=>{
    sinon.restore();
  })

  it('return code 200 after list all matches', async () => {
    sinon.stub(Matches, 'findAll').resolves(matches as Matches[]);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matches);
  });

  it('return code 201 after create a match', async () => {
    sinon.stub(JWT, 'validateToken').returns({ data: user } as any);
    sinon.stub(Matches, 'create').resolves(newMatch as Matches);
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', 'token')
      .send(newMatch)
    expect(status).to.be.eq(201);
    // console.log(body, status);
    expect(body).to.be.deep.eq(newMatch);
  });

  it('return code 200 after update goals', async () => {
    sinon.stub(JWT, 'validateToken').returns({ data: user } as any);
    sinon.stub(Matches, 'update').resolves();
    const { status, body } = await chai.request(app)
      .patch('/matches/2')
      .set('Authorization', 'token')
      .send({
        awayTeamGoals: 5,
      })
    expect(status).to.be.eq(200);
    // console.log(body, status);
    expect(body.message).to.be.deep.eq('Finished');
  });

  it('return code 200 after update progress', async () => {
    sinon.stub(JWT, 'validateToken').returns({ data: user } as any);
    sinon.stub(Matches, 'update').resolves();
    const { status, body } = await chai.request(app)
      .patch('/matches/2/finish')
      .set('Authorization', 'token')

    expect(status).to.be.eq(200);
    // console.log(body, status);
    expect(body.message).to.be.deep.eq('Finished');
  });

});
