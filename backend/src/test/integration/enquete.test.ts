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

describe('Enquetes Test', function () {
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

  it('should update a Enquete', async function() {
    sinon.stub(SequelizeTest, 'update').resolves([1] as any);
    sinon.stub(SequelizeTest, 'findByPk').resolves(enquete as any);
    sinon.stub(Validations, 'validateEnquete').returns();

    const { id, ...sendData } = enquete;

    const { status, body } = await chai.request(app).put('/enquetes/1')
      .send(sendData);

    expect(status).to.equal(200);
    expect(body.message).to.equal('Enquete updated');
  });

  it('should return not found when the Enquete to update does not exists', async function() {
    sinon.stub(SequelizeTest, 'findByPk').resolves(null);

    const { id, ...sendData } = enquete;

    const { status, body } = await chai.request(app).put('/enquetes/1')
      .send(sendData);

    expect(status).to.equal(404);
    expect(body.message).to.equal('Enquete 1 not found');
  });

  it('should return conflict when there is nothing to be updated', async function() {
    sinon.stub(SequelizeTest, 'findByPk').resolves(enquete as any);
    sinon.stub(SequelizeTest, 'update').resolves([0] as any);

    const { id, ...sendData } = enquete;

    const { status, body } = await chai.request(app).put('/enquetes/1')
      .send(sendData);

    expect(status).to.equal(409);
    expect(body.message).to.equal('There are no updates to perform in Enquete 1');
  });

  it('should delete a enquete', async function() {
    sinon.stub(SequelizeTest, 'destroy').resolves();
    sinon.stub(SequelizeTest, 'findByPk').resolves(enquete as any);

    const { status, body } = await chai.request(app).delete('/enquetes/1');

    expect(status).to.equal(200);
    expect(body.message).to.equal('Enquete deleted');
  });

  it('should return not found when the enquete to delete does not exists', async function() {
    sinon.stub(SequelizeTest, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).delete('/enquetes/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Enquete 1 not found');
  });

  afterEach(sinon.restore);
});