import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../App';
import SequelizeTest from '../../database/models/SequelizeEnquete';
import { enquete, enquetes } from '../mocks/Enquete.mock';


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
    expect(body.message).to.equal('enquete 1 not found');
  });

  afterEach(sinon.restore);
});