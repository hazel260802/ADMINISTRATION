import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  no: index + 1,
  name: faker.name.fullName(),
  studentId: faker.datatype.uuid(),
  school: faker.company.name(),
}));

export default users;
