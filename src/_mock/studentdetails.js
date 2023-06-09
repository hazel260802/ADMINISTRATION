import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(1)].map((_, index) => ({
  studentId: faker.datatype.uuid(),
  name: faker.name.fullName(),
  yearOfAdmission: faker.datatype.number(20020),
  degreeProgram: faker.lorem.word(10),
  program: faker.lorem.sentence(),
  school: faker.company.name(),
  studyStatus: faker.lorem.word(10),
  gender: faker.lorem.word(5),
  studentClass: faker.lorem.words(5),
  cohort: faker.datatype.number(100),
  email: faker.internet.email(),
}));

export default users;
