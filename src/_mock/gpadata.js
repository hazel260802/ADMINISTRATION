import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const gpadata = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  studentId: faker.datatype.uuid(),
  semester: `Semester ${index + 1}`,
  gpa: faker.datatype.float({ min: 1, max: 4, precision: 2 }),
}));

export default gpadata;
