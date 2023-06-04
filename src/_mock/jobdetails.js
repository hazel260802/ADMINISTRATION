import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const jobdetails = [...Array(3)].map((_, index) => ({
  jobId: faker.datatype.uuid(),
  ownerAccountId: faker.datatype.uuid(),
  username: faker.name.fullName(),
  password: faker.datatype.uuid(),
  classIds: faker.datatype.array(),
  timeToStart: faker.date.birthdate(),
  originTimeToStart: faker.date.birthdate(),
  status: faker.internet.httpStatusCode(),
  createdAt: faker.date.birthdate(),
  doingAt: faker.date.birthdate(),
  iv: faker.datatype.uuid(),
  no: faker.datatype.number(),
  termId: faker.datatype.number(20220),
  priority: faker.datatype.number(),
  nextJobId: faker.datatype.uuid(),
  deleteClassIds: faker.datatype.array(),
}));

export default jobdetails;
