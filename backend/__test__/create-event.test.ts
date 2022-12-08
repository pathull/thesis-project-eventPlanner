import 'dotenv/config';
import express from 'express';
import { describe, beforeAll, afterEach, expect, test, afterAll } from '@jest/globals';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { UserSchema } from '../src/models/schemas/user-schemas';
import { EventsSchema } from '../src/models/schemas/event-schema';
import { sequelize } from '../src/models/connectionDb'
import appRoutes from '../src/routes/index'


describe('Integration tests for Create Event routes', () => {
  const app = express();
  app.use(express.json());
  const request = supertest(app);
  app.use('/', appRoutes);

  beforeAll(async () => {
    await sequelize.sync({ force:true })
  });

  afterEach(async () => {
    await UserSchema.destroy({where:{}, force: true});
    await EventsSchema.destroy({where:{}, force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

describe('Post /event', () => {
  test('Should successfully create an event w/o picture', async () => {
    const user = await UserSchema.create({ email: faker.internet.email(), username: faker.internet.userName(), picUrl: faker.image.image(), name: faker.internet.userName()   });


    const mockEventData = {
      createdBy: user.getDataValue('id'),
      location: faker.lorem.sentence(2),
      eventDate:faker.lorem.sentence(2),
      eventName:faker.lorem.sentence(2),
      description: faker.lorem.sentence(10),
    }

    const res = await request.post(`/api/events`).send(mockEventData);
    expect(res.statusCode).toBe(201)
    expect(res.body.location).toMatch(mockEventData.location);
    expect(res.body.description).toMatch(mockEventData.description);
  });

  test('Should successfully create an event with a picture', async () => {
  const user = await UserSchema.create({ email: faker.internet.email(), username: faker.internet.userName(), picUrl: faker.image.image(), name: faker.internet.userName()   });

  const response = await request.post('/api/events')
  .set("Content-Type", "multipart/form-data")
  .field("createdBy", `${user.getDataValue('id')}`)
  .field("eventName", "the place")
  .field("eventDate", "anything" )
  .field("location", "1111 street")
  .field("description", "hello there")
  .attach(
    "eventPic",
    "./__test__/MJ.jpg"
  )
  
  expect(response.statusCode).toBe(201);
 
    });
  });
});

