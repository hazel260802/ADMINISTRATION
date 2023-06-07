import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const gpadata = [...Array(5)].map((_, index) => ({
  termId: faker.datatype.number(20203),
  GPA: faker.datatype.float(),
  CPA: faker.datatype.float(),
  passCredits: faker.datatype.number(200),
  accumulatedCredits: faker.datatype.number(200),
  debtCredits: faker.datatype.number(10),
  registeredCredits: faker.datatype.number(10),
  studentLevel: faker.lorem.word(10),
  warningLevel: faker.lorem.word(10),
}));

export default gpadata;
