import { faker } from "@faker-js/faker";

export function createArticle() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    url: faker.internet.url(),
    addedAt: faker.date.recent(),
  };
}
