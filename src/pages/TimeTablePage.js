import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link as RouterLink, json, useLoaderData } from 'react-router-dom';

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
  TableContainer,
  TablePagination,
  IconButton,
  Link,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { TimeTableListHead, TimeTableListToolbar } from '../sections/@dashboard/timetable';

// service
import { getJobs, getSemesters } from '../services/jobs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'studentId', label: 'StudentId', alignRight: false },
  { id: 'termId', label: 'TermId', alignRight: false },
  { id: 'jobId', label: 'JobId', alignRight: false },
  { id: 'jobDetails', label: 'Job Details', alignRight: false },
];

// ----------------------------------------------------------------------

export default function TimeTablePage() {
  // Get loader data
  const loaderData = useLoaderData();
  const { jobList: loadedJobList, jobQuantity: loadedJobQuantity, semesterList: loadedSemesterList } = loaderData;

  // Local states
  const [page, setPage] = useState(0);
  const [order] = useState('asc');
  const [selected] = useState([]);
  const [orderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Custom states
  const [jobList, setJobList] = useState(loadedJobList);
  const [jobQuantity, setJobQuantity] = useState(loadedJobQuantity);
  const [semesterList] = useState(loadedSemesterList);
  const [currentSemester, setCurrentSemester] = useState(semesterList.length > 0 ? semesterList[0] : 'None');

  // Params
  const isNotFound = !jobList.length && !!filterName;
  const noData = !jobList.length && !filterName;

  // Update current job list
  const updateJobList = async (studentId, termId, page, size) => {
    const response = await getJobs({
      studentId,
      termId,
      page,
      size,
    });

    if (!response.ok) throw Error('Fail to filter data!');

    const newJobData = await response.json();
    const { DKHPTDJobV1List: newJobList, quantity: newJobQuantity } = newJobData.data;

    console.log(`New job list: ${JSON.stringify(newJobList)}`);
    console.log(`New job quantity: ${JSON.stringify(newJobQuantity)}`);

    // Change local states
    setJobList(newJobList);
    setJobQuantity(newJobQuantity);
  };

  // Change semester
  const handleFilterSemester = async (semester) => {
    setCurrentSemester(semester);
    console.log(`Change semester to ${semester}`);

    // Reset data
    await updateJobList(null, semester, 1, rowsPerPage);

    // Back to page 1
    setPage(0);
    setFilterName('');
  };

  // Change page
  const handleChangePage = async (event, newPage) => {
    console.log(`Jump to page ${newPage}`);

    // Reset data
    await updateJobList(null, currentSemester, newPage + 1, rowsPerPage);

    // Change page
    setPage(newPage);
    setFilterName('');
  };

  // Change row per page
  const handleChangeRowsPerPage = async (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);

    // Reset data
    await updateJobList(null, currentSemester, 1, newRowPerPage);

    // Back to page 1
    setPage(0);
    setRowsPerPage(newRowPerPage);
    setFilterName('');
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      console.log(`Enter pressed. Search for ${filterName}!`);

      // Update job list
      await updateJobList(filterName === '' ? null : filterName, currentSemester, 1, rowsPerPage);

      // Back to page 1
      setPage(0);
    }
  };

  return (
    <>
      <Helmet>
        <title> TimeTable </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            TimeTable
          </Typography>
        </Stack>

        <Card>
          <TimeTableListToolbar
            semesterList={semesterList}
            currentSemester={currentSemester}
            handleFilterSemester={handleFilterSemester}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={(event) => {
              setFilterName(event.target.value);
            }}
            onSubmit={handleSearchSubmit}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TimeTableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={jobList.length}
                  numSelected={selected.length}
                  onRequestSort={() => console.log('Call handleRequestSort!')}
                  onSelectAllClick={() => console.log('Call handleAllSelectClick!')}
                />
                <TableBody>
                  {jobList.map((row, index) => {
                    const no = page * rowsPerPage + index + 1;
                    const { username: studentId, _id: jobId, termId } = row;
                    const selectedTimeTable = selected.indexOf(studentId) !== -1;

                    return (
                      <TableRow hover key={jobId} tabIndex={-1} role="checkbox" selected={selectedTimeTable}>
                        <TableCell align="left">{no}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" marginLeft={2} spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {studentId}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{termId}</TableCell>

                        <TableCell align="left">{jobId}</TableCell>

                        <TableCell align="left">
                          <Link
                            component={RouterLink}
                            to={`/dashboard/joblog/${jobId}/details`}
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
                            <strong>&quot;{filterName}&quot;</strong>.
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
                            No results found for semester &nbsp;
                            <strong>&quot;{currentSemester}&quot;</strong>.
                            <br /> Try other semesters instead.
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
            count={jobQuantity}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            sx={{
              pointerEvents: 'none',
            }}
            variant="contained"
            size="large"
            color="primary"
            startIcon={<SummarizeIcon />}
          >
            Quantity: {jobQuantity}
          </Button>
        </div>
      </Container>
    </>
  );
}

export async function timetableLoader() {
  // Get semester list
  const semesterResponse = await getSemesters();

  const semesterData = await semesterResponse.json();

  if (!semesterResponse.ok) {
    console.log(`Error code: ${semesterResponse.status}`);
    console.log(`Error message: ${semesterData.message}`);
  }

  const semesterList = semesterData.data.sort().reverse(); // sort semester
  console.log(`Loaded semesters: ${JSON.stringify(semesterList)}`);

  // Sort semesters
  const latestSemester = semesterList[0];
  const jobResponse = await getJobs({
    studentId: null,
    termId: latestSemester,
    page: 1,
    size: 10,
  });

  const jobsData = await jobResponse.json();

  if (!jobResponse.ok) {
    console.log(`Error code: ${jobResponse.status}`);
    console.log(`Error message: ${jobsData.message}`);
  }

  const { DKHPTDJobV1List: jobList, quantity: jobQuantity } = jobsData.data;

  console.log(`Loaded job list: ${JSON.stringify(jobList)}`);
  console.log(`Loaded job quantity: ${jobQuantity}`);

  return json({ jobList, jobQuantity, semesterList });
}
