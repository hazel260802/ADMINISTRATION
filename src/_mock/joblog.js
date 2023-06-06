import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const timetable = [...Array(24)].map((_, index) => ({
  no: index + 1,
  studentId: faker.datatype.number(100000),
  method: faker.internet.httpMethod(),
  url: faker.internet.url(),
  status: faker.internet.httpStatusCode(),
  time: faker.datatype.datetime(),
  reponseTime: faker.datatype.number(100000),
}));

export default timetable;
