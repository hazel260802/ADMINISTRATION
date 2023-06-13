import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  no: index + 1,
  name: faker.name.fullName(),
  studentId: faker.datatype.uuid(),
  cohort: faker.datatype.number(),
  school: faker.company.name(),
}));

export default users;
