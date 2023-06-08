import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const logdetails = [...Array(2)].map((_, index) => ({
  workerId: faker.datatype.uuid(),
  stepIdx: faker.datatype.number(),
  action: faker.lorem.sentence(),
  at: faker.lorem.words(),
  output: faker.lorem.words(),
  nestingLogs: [...Array(2)].map((_, index) => ({
    stepIdx: faker.datatype.number(),
    action: faker.lorem.sentence(),
    at: faker.lorem.words(),
    output: faker.lorem.words(),
  }))
}));

export default logdetails;
