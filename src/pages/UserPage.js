import { Helmet } from 'react-helmet-async';
import { Suspense, useState } from 'react';
import { Link as RouterLink, useLoaderData, json, defer, Await } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Link,
} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// service
import { getStudents } from '../services/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'studentId', label: 'StudentId', alignRight: false },
  { id: 'cohort', label: 'Cohort', alignRight: false },
  { id: 'school', label: 'School', alignRight: false },
  { id: 'studentDetails', label: 'Student Details', alignRight: false },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  // Get loader data
  const { data } = useLoaderData();
  const { quantity, studentList } = data;

  // Local states
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterCohort, setFilterCohort] = useState('');
  const [filterStudentId, setFilterStudentId] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Custom states
  const [studentFilterList, setStudentList] = useState(studentList);
  const [studentQuantity, setStudentQuantity] = useState(quantity);
  const [currentSchool, setCurrentSchool] = useState('');

  // Params
  const isNotFound = !studentFilterList?.length && !!filterStudentId && !!filterCohort;
  const noData = !studentFilterList?.length && !filterStudentId && !!filterCohort;

  // Update current student list
  const updateStudentList = async ({ studentId, school, cohort, page, size }) => {
    const response = await getStudents({ studentId, school, cohort, page, size });

    if (!response.ok) throw Error('Fail to filter data!');

    const newData = await response.json();
    const { studentList: newStudentList, quantity: newQuantity } = newData.data;

    // Filter the student list based on filterStudentId
    // const filteredStudentList = newStudentList.filter((student) =>
    // student.studentId.toString().includes(filterStudentId)
    // );
    console.log(`New student list: ${JSON.stringify(newStudentList)}`);
    console.log(`New student quantity: ${JSON.stringify(newQuantity)}`);

    // Change local states
    setStudentList(newStudentList);
    setStudentQuantity(newQuantity);
  };

  // Change school
  const handleFilterSchool = async (selectedSchool) => {
    setCurrentSchool(selectedSchool);
    console.log(`Change school to ${selectedSchool}`);
    // Reset data
    await updateStudentList({
      studentId: filterStudentId,
      school: selectedSchool,
      cohort: '',
      page: 1,
      size: rowsPerPage,
    });

    // Back to page 1
    setPage(0);
    setFilterStudentId('');
  };

  // Change page
  const handleChangePage = async (newPage) => {
    console.log(`Jump to page ${newPage}`);

    // Reset data
    await updateStudentList({
      studentId: filterStudentId,
      school: currentSchool,
      cohort: '',
      page: newPage + 1,
      size: rowsPerPage,
    });

    // Change page
    setPage(newPage);
    setFilterStudentId('');
  };

  // Change row per page
  const handleChangeRowsPerPage = async (event) => {
    const newRowPerPage = parseInt(event.target.value, 5);

    // Reset data
    await updateStudentList({
      studentId: filterStudentId,
      school: currentSchool,
      cohort: '',
      page: 1,
      size: rowsPerPage,
    });

    // Back to page 1
    setPage(0);
    setRowsPerPage(newRowPerPage);
    setFilterStudentId('');
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      console.log(`Enter pressed. Search for ${filterCohort}!`);

      // Update student list
      await updateStudentList({
        studentId: filterStudentId,
        school: currentSchool,
        cohort: filterCohort,
        page: 1,
        size: rowsPerPage,
      });

      // Back to page 1
      setPage(0);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = studentFilterList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student List
          </Typography>
          <Button
            component={RouterLink}
            to={`/dashboard/settings`}
            variant="contained"
            size="medium"
            color="secondary"
            startIcon={<ManageAccountsIcon />}
          >
            Settings
          </Button>
        </Stack>
        
        <Card>
          <UserListToolbar
            currentSchool={currentSchool}
            handleFilterSchool={handleFilterSchool}
            numSelected={selected.length}
            filterStudentId={filterStudentId}
            onFilterStudentId={(event) => {
              setFilterStudentId(event.target.value);
            }}
            filterCohort={filterCohort}
            onFilterCohort={(event) => {
              setFilterCohort(event.target.value);
            }}
            onSubmit={handleSearchSubmit}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={studentFilterList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={studentFilterList&&studentQuantity}>
                      {studentFilterList.map((row, index) => {
                        const no = page * rowsPerPage + index + 1;
                        const { name, studentId, cohort, school } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow hover key={studentId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell align="left">{no}</TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{studentId}</TableCell>

                            <TableCell align="left">{cohort}</TableCell>

                            <TableCell align="left">{school}</TableCell>

                            <TableCell align="left">
                              <Link
                                component={RouterLink}
                                to={`/dashboard/user/${studentId}/details`}
                                variant="subtitle2"
                                underline="hover"
                              >
                                <IconButton size="large" color="inherit">
                                  <Iconify icon={'fluent:open-16-filled'} />
                                </IconButton>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </Await>
                  </Suspense>
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterStudentId}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {noData && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Data does not exist!
                          </Typography>

                          <Typography variant="body2">
                            No results found for cohort &nbsp;
                            <strong>&quot;{filterCohort}&quot;</strong>.
                            <br /> Try other cohort instead.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            component="div"
            count={studentQuantity}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" size="large" color="primary" startIcon={<SummarizeIcon />}>
            Quantity: {studentQuantity}
          </Button>
        </div>
      </Container>
    </>
  );
}

async function loadStudents() {
  const response = await getStudents({
    studentId: '',
    school: '',
    cohort: '',
    page: 1,
    size: 5,
  });
  console.log(response);
  if (response.status === 401 || response.status === 400 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch students.' },
      {
        status: 500,
      }
    );
  }

  const resData = await response.json();
  console.log(resData.data);
  return resData.data;
}

export async function loader() {
  return defer({
    data: await loadStudents(),
  });
}
