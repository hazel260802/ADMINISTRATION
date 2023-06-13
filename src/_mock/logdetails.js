import { faker } from '@faker-js/faker';
// ----------------------------------------------------------------------

const logdetails = [...Array(2)].map(() => ({
  workerId: faker.datatype.uuid(),
  stepIdx: faker.datatype.number(),
  action: faker.lorem.sentence(),
  at: faker.lorem.words(),
  output: faker.lorem.words(),
  nestingLogs: [...Array(2)].map(() => ({
    stepIdx: faker.datatype.number(),
    action: faker.lorem.sentence(),
    at: faker.lorem.words(),
    output: faker.lorem.words(),
  }))
}));

export default logdetails;
