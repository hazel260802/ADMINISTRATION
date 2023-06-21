import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLoaderData, json} from 'react-router-dom';
import { useState } from 'react';
// @mui
import {
  Stack,
  Typography,
  Container,
  Button,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// sections
import {StudentGPATable, StudentInfo, StudentLanguageTable, StudentSubjectTable} from '../sections/@dashboard/studentdetails'
// service
import { getStudentPromise } from '../services/user';


// ----------------------------------------------------------------------



function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{children}</div>;
}
export default function StudentDetailsPage() {

  const { res1, res2, res3, res4 } = useLoaderData();
  
  const [ studentInfo, ] = useState(res1.data.studentInfoList);
  const [ studentLanguage, ] = useState(res2.data.studentLanguageResults);
  const [ studentSubject, ] = useState(res3.data.studentSubjectGrades);
  const [ studentSemester, ] = useState(res4.data.studentSemesterGrades);

  const tabs = [
    { id: 'info', label: 'Student Information', component: StudentInfo, data: studentInfo},
    { id: 'language', label: 'Language Grade', component: StudentLanguageTable, data: studentLanguage },
    { id: 'subject', label: 'Subject Grade', component: StudentSubjectTable, data: studentSubject },
    { id: 'semester', label: 'Subject Semester', component: StudentGPATable, data: studentSemester },
  ];

  const [value, setValue] = useState('info');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student Details
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              bgcolor: 'background.paper',
              width: '95%',
            }}
          >
            <Tabs
              value={value}
              onChange={(event, newValue) => handleChange(newValue)}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {tabs.map((tab) => (
                <LinkTab key={tab.id} label={tab.label} value={tab.id} />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: 3,
            }}
          >
            {tabs.map((tab) => (
              <TabPanel key={tab.id} value={value} index={tab.id}>
                {value === tab.id && <tab.component data={tab.data} />}
              </TabPanel>
            ))}

            </Box>
        </Box>
      </Container>
    </>
  );
}
export async function loadStudent({ params }) {
  const { id }  = params;
  const response = await getStudentPromise(id);

  return response;
}

