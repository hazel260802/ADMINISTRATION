import { faker } from '@faker-js/faker';
// ----------------------------------------------------------------------

const languagedata = [...Array(5)].map(() => ({
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
