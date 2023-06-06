import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const subjectdata = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  studentId: faker.datatype.uuid(),
  subject: sample(['Math', 'Science', 'History', 'English']),
  grade: faker.datatype.number({ min: 50, max: 100 }),
}));

export default subjectdata;
