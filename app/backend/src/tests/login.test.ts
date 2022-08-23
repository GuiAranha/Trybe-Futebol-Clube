import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import IUser from '../interfaces/IUser';
import Users from '../database/models/user';
import LoginService from '../services/login.services';
import BaseError from '../utils/baseError';

chai.use(chaiHttp);

const { expect } = chai;

const blankUser = {
  email: '',
  password: '',
}

const newUser = {
  email: 'abc@gmail.com',
  password: '1234567',
}

const user: IUser = {
  id: 1,
  username: 'username',
  role: 'admin',
  email: 'email@gmail.com',
  password: 'password',
}

describe('Teste de Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

   beforeEach(() => {
     sinon
       .stub(Users, 'findOne')
       .resolves(user as Users);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('return code 400 if have empty fields', async () => {
    const { status, body } = await chai.request(app).post('/login').send(blankUser);
    expect(status).to.be.eq(400);
    expect(body.message).to.be.eq('All fields must be filled');
  });

  it('return code 401 if have wrong user', async () => {
    sinon.stub(LoginService.prototype, 'login').callsFake(() => {
      throw new BaseError(401, 'Incorrect email or password')
    });
    const { status, body } = await chai.request(app).post('/login').send(newUser);
    expect(status).to.be.eq(401);
    expect(body.message).to.be.eq('Incorrect email or password');
  });

  it('return code 200 if success', async () => {
    const { status, body } = await chai.request(app).post('/login').send(newUser);
    expect(status).to.be.eq(200);
    expect(body).to.have.property('token');
  });
});
