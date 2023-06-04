import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const logdetails = [...Array(1)].map((_, index) => ({
  no: index + 1,
  jobId: faker.datatype.uuid(),
  workerId: faker.datatype.uuid(),
  ownerAccountId: faker.datatype.uuid(),
  logs: faker.lorem.paragraph(),
}));

export default logdetails;
