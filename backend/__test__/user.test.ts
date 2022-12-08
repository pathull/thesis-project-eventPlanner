import 'dotenv/config';
import express from 'express';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { UserSchema } from '../src/models/schemas/user-schemas';
import { AppErrors } from '../src/helpers/app-error';
import { sequelize } from '../src/models/connectionDb'
import appRoutes from '../src/routes/index'


describe('Integration tests for Backend User Route', () => {
  const app = express();
  app.use(express.json());
  const request = supertest(app)
  app.use('/', appRoutes);
  beforeAll(async () => {
    await sequelize.sync({ force:true })
  });

  afterEach(async () => {
    await UserSchema.destroy({where:{}, force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

describe('Post /user', () => {
  test('Should return user and status 201', async () => {
    const email = faker.internet.email();
    const res = await request.post('/api/users').send({ email })
    expect(res.statusCode).toBe(201)
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(res.body.id).toBeDefined();
      expect(res.body.email).toBe(email);
  });

  test('Should return status code 400 and throw an error when email is invalid', async () => {
    const email = 'invalid'
    try {
      await request.post('/api/users').send({ email });
    } catch (err) {
      expect(err).toBeInstanceOf(AppErrors);
      expect((err as AppErrors).status).toBe(400);
      }
    });
  });
});

