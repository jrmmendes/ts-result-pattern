import { Result } from "./result";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users = [
  {
    id: '8164e4a0-6780-41c7-8922-33fb0dae86dd',
    name: 'Romildo',
    email: 'jrmmendes@mail.com',
    password: '123',
  },
  {
    id: '4873b527-5864-4f0b-8925-fdb35ef76199',
    name: 'Rafael',
    email: 'rafael@mail.com',
    password: '123',
  },
  {
    id: '1aa04555-db0c-495e-a1d5-23de64f1670b',
    name: 'Stevan',
    email: 'stevan@mail.com',
    password: '123',
  },
  {
    id: '6d2e3e09-77da-492d-87a1-af28431125cc',
    name: 'Leonardo',
    email: 'leo@mail.com',
    password: '123',
  }
];

export abstract class Database {
  static findUser(id: string): Result<User> {
    const user = users
      .find(user => user.id === id);

    return (user === undefined) 
      ? Result.fail('User not found')
      : Result.ok(user);
  }

  static users(limit: number = 5): Result<User[]> {
    return limit <= 0 
    ? Result.fail('InvalidParameter: "limit" must be a positive number') 
    : Result.ok(users.slice(0, limit));
  }
}