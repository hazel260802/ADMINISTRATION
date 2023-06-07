import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const languagedata = [...Array(5)].map((_, index) => ({
  studentId: faker.datatype.uuid(),
  name: faker.name.fullName(),
  dob: faker.date.birthdate().toString(),
  termId: faker.datatype.number(20203),
  note: faker.lorem.sentence(),
  date: faker.date.birthdate().toString(),
  listening: faker.datatype.number(),
  reading: faker.datatype.number(),
  total: faker.datatype.number(),
}));

export default languagedata;
