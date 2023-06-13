import { faker } from '@faker-js/faker';
// ----------------------------------------------------------------------

const jobdetails = [...Array(1)].map(() => ({
  jobId: faker.datatype.uuid(),
  ownerAccountId: faker.datatype.uuid(),
  username: faker.name.fullName(),
  password: faker.datatype.uuid(),
  classIds: faker.datatype.array(),
  timeToStart: faker.date.birthdate().toString(),
  originTimeToStart: faker.date.birthdate().toString(),
  status: faker.internet.httpStatusCode(),
  createdAt: faker.date.birthdate().toString(),
  doingAt: faker.date.birthdate().toString(),
  iv: faker.datatype.uuid(),
  no: faker.datatype.number(),
  termId: faker.datatype.number(20220),
  priority: faker.datatype.number(),
  nextJobId: faker.datatype.uuid(),
  deleteClassIds: faker.datatype.array(),
}));

export default jobdetails;
