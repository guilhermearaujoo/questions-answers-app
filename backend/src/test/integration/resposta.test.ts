import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../App';
import SequelizeTest from '../../database/models/SequelizeResposta';
import { resposta, respostas } from '../mocks/Resposta.mock';
import Validations from '../../middlewares/Validations';

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

  it('should create a resposta', async function() {
    sinon.stub(SequelizeTest, 'create').resolves(resposta as any);
    sinon.stub(Validations, 'validateResposta').returns();

    const { id, ...sendData } = resposta;

  const { status, body } = await chai.request(app).post('/respostas')
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(resposta);
  });


  describe('shouldn\'t create a resposta with invalid body data', async function() {
    it('Shouldn\'t create a resposta with invalid enqueteId', async function() {
      const { status, body } = await chai.request(app).post('/respostas')
        .send({
          resposta: "resposta",
          "enqueteId": "1",
        });
  
      expect(status).to.equal(422);
      expect(body.message).to.equal('enqueteId must be a number');
    });

    it('Shouldn\'t create a resposta without resposta', async function() {
      const { status, body } = await chai.request(app).post('/respostas')
        .send({
          "enqueteId": 1
        });
  
      expect(status).to.equal(400);
      expect(body.message).to.equal('resposta is required');
    });

    it('Shouldn\'t create a resposta without enqueteId', async function() {
      const { status, body } = await chai.request(app).post('/respostas')
        .send({
          "resposta": "resposta"
        });
  
      expect(status).to.equal(400);
      expect(body.message).to.equal('enqueteId is required');
    });

    it('should update a resposta', async function() {
      sinon.stub(SequelizeTest, 'update').resolves([1] as any);
      sinon.stub(SequelizeTest, 'findByPk').resolves(resposta as any);
      sinon.stub(Validations, 'validateResposta').returns();
  
      const { id, ...sendData } = resposta;
  
      const { status, body } = await chai.request(app).put('/respostas/1')
        .send(sendData);
  
      expect(status).to.equal(200);
      expect(body.message).to.equal('Resposta updated');
    });
  
    it('should return not found when the resposta to update does not exists', async function() {
      sinon.stub(SequelizeTest, 'findByPk').resolves(null);
  
      const { id, ...sendData } = resposta;
  
      const { status, body } = await chai.request(app).put('/respostas/1')
        .send(sendData);
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('Resposta 1 not found');
    });
  
    it('should return conflict when there is nothing to be updated', async function() {
      sinon.stub(SequelizeTest, 'findByPk').resolves(resposta as any);
      sinon.stub(SequelizeTest, 'update').resolves([0] as any);
  
      const { id, ...sendData } = resposta;
  
      const { status, body } = await chai.request(app).put('/respostas/1')
        .send(sendData);
  
      expect(status).to.equal(409);
      expect(body.message).to.equal('There are no updates to perform in Resposta 1');
    });

    it('should delete a resposta', async function() {
      sinon.stub(SequelizeTest, 'destroy').resolves();
      sinon.stub(SequelizeTest, 'findByPk').resolves(resposta as any);
  
      const { status, body } = await chai.request(app).delete('/respostas/1');
  
      expect(status).to.equal(200);
      expect(body.message).to.equal('Resposta deleted');
    });
  
    it('should return not found when the resposta to delete does not exists', async function() {
      sinon.stub(SequelizeTest, 'findByPk').resolves(null);
  
      const { status, body } = await chai.request(app).delete('/respostas/1');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('Resposta 1 not found');
    });
  });

  afterEach(sinon.restore);
});