import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// ----------------------------------------------------------------------

const subjectdata = [...Array(5)].map(() => ({
  termId: faker.datatype.number(20203),
  subjectId: faker.datatype.number(20203),
  subjectName: sample(['Math', 'Science', 'History', 'English']),
  subjectVolume: faker.datatype.number(20203),
  classId: faker.datatype.string(5),
  midtermGrade: faker.datatype.number(10),
  finalGrade: faker.datatype.number(10),
  letterGrade: faker.datatype.string(1),
}));

export default subjectdata;
