import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../App';
import SequelizeTest from '../../database/models/SequelizeEnquete';
import { enquete, enquetes } from '../mocks/Enquete.mock';
import Validations from '../../middlewares/Validations';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Respostas Test', function () {
  it('should return all enquetes', async function () {
    sinon.stub(SequelizeTest, 'findAll').resolves(enquetes as any);

    const { status, body } = await chai.request(app).get('/enquetes');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(enquetes);
  });

  it('should return a enquete by id', async function() {
    sinon.stub(SequelizeTest, 'findOne').resolves(enquete as any);

    const { status, body } = await chai.request(app).get('/enquetes/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(enquete);
  });

  it('should return not found if the enquete doesn\'t exists', async function() {
    sinon.stub(SequelizeTest, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/enquetes/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Enquete 1 not found');
  });

  it('should create a enquete', async function() {
    sinon.stub(SequelizeTest, 'create').resolves(enquete as any);
    sinon.stub(Validations, 'validateEnquete').returns();

    const { id, ...sendData } = enquete;

  const { status, body } = await chai.request(app).post('/enquetes')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(enquete);
  });


  it('shouldn\'t create a enquete with invalid body data', async function() {

    const { status, body } = await chai.request(app).post('/enquetes')
      .send({});

    expect(status).to.equal(400);
    expect(body.message).to.equal('pergunta is required');
  });

  afterEach(sinon.restore);
});