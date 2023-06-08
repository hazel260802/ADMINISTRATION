import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const timetable = [...Array(24)].map((_, index) => ({
  no: index + 1,
  studentId: faker.datatype.number(100000),
  jobId: faker.datatype.uuid(),
  termId: faker.datatype.number(2020),
}));

export default timetable;
