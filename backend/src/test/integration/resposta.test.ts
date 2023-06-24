import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../App';
import SequelizeTest from '../../database/models/SequelizeResposta';
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

  it('should return a resposta by id', async function() {
    sinon.stub(SequelizeTest, 'findOne').resolves(resposta as any);

    const { status, body } = await chai.request(app).get('/respostas/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resposta);
  });

  it('should return not found if the resposta doesn\'t exists', async function() {
    sinon.stub(SequelizeTest, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/respostas/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Resposta 1 not found');
  });

  afterEach(sinon.restore);
});