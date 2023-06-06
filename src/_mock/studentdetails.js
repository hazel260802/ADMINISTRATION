import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(1)].map((_, index) => ({
  no: index + 1,
  avatar: faker.image.avatar(),
  name: faker.name.fullName(),
  studentId: faker.datatype.uuid(),
  school: faker.company.name(),
}));

export default users;
