import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  function signin(): Promise<string[] | null>;
}

let mongo: any;

// create an instance of the mongo memory server
// before any test runs
beforeAll(async () => {
  //process.env(envName(ResolveConfigVariables.JWT_KEY)) = "sdfio2r8w8rhs9fh";
  process.env.JWT_KEY = "sdfio2r8w8rhs9fh";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie") || null;
  return cookie;
};
