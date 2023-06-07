import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Typography,
  TableContainer,
  TablePagination,
  Link,
  IconButton,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Button,
  Grid
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'termId', label: 'Term Id', alignRight: false },
  { id: 'GPA', label: 'GPA', alignRight: false },
  { id: 'CPA', label: 'CPA', alignRight: false },
  { id: 'passCredits', label: 'Pass Credits', alignRight: false },
  { id: 'accumulatedCredits', label: 'Accumulated Credits', alignRight: false },
  { id: 'debtCredits', label: 'Debt Credits', alignRight: false },
  { id: 'Registered Credits', label: 'Registered Credits', alignRight: false },
  { id: 'studentLevel', label: 'Student Level', alignRight: false },
  { id: 'warningLevel', label: 'Warning Level', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StudentGPATable({data}) {


  return (
    <>
      <Container >
        <Card >
        <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={5} sx={{ marginLeft: 2, marginTop: 2 }} >
                  {data.map((studentData) => (
                    <div className="info-item">
                      <Typography component="div" variant="body2">
                        MSSV: {studentData.studentId}
                        <br/>
                        Fullname: {studentData.name}
                        <br/>
                        Year of Addmission: {studentData.yearOfAdmission}
                        <br/>
                        Degree Program: {studentData.degreeProgram}
                        <br/>
                        Program: {studentData.program}
                        <br/>
                        School: {studentData.school}

                      </Typography>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} md={6} lg={5} sx={{ marginTop: 2 }}>
                  {data.map((studentData) => (
                    <div className="info-item">
                      <Typography component="div" variant="body2">
                        Study Status: {studentData.studyStatus}
                        <br/>
                        Gender: {studentData.gender}
                        <br/>
                        Class: {studentData.class}
                        <br/>
                        Cohort: {studentData.cohort}
                        <br/>
                        Email: {studentData.email}
                      </Typography>

                    </div>
                  ))}
                </Grid>
              </Grid>
        </Card>
      </Container>
    </>
  );
}
