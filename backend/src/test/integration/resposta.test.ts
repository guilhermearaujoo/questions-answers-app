import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../App';
import SequelizeTest from '../../database/models/SequelizeEnquete';
import { resposta, respostas } from '../mocks/Resposta.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Respostas Test', function () {
  it('should return all respostas', async function () {
    sinon.stub(SequelizeTest, 'findAll').resolves(respostas as any);

    const { status, body } = await chai.request(app).get('/respostas');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(respostas);
  });
});