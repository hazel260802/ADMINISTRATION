import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const languagedata = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  studentId: faker.datatype.uuid(),
  language: sample(['English', 'French', 'Spanish', 'German']),
  proficiency: sample(['Beginner', 'Intermediate', 'Advanced']),
}));

export default languagedata;
