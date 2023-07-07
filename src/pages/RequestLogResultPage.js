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
  TableContainer,
  TablePagination,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { RequestLogListHead, RequestLogListToolbar } from '../sections/@dashboard/requestlog';
// service
import { getRequestLogs } from '../services/requestlog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'method', label: 'Method', alignRight: false },
  { id: 'url', label: 'URL', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'timestamp', label: 'Timestamp', alignRight: false },
  { id: 'responeTime', label: 'Respone Time', alignRight: false },
];

// ----------------------------------------------------------------------

export default function RequestLogPage() {
  const { data } = useLoaderData();
  const { quantity, requestLogs } = data;

  // Local states
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Custom states
  const [requestList, setRequestList] = useState(requestLogs);
  const [requestQuantity, setRequestQuantity] = useState(quantity);
  // Params
  const isNotFound = !requestList.length && !!filterName;
  const noData = !requestList.length && !filterName;

  // Update current request job list
  const updateRequestList = async ({ page, size }) => {
    const response = await getRequestLogs({
      page,
      size,
    });

    if (!response.ok) throw Error('Fail to filter data!');

    const newRequestJobData = await response.json();
    const { requestLogs: newRequestList, quantity: newQuantity } = newRequestJobData.data;
    console.log(`New request job list: ${JSON.stringify(newRequestList)}`);
    console.log(`New request quantity: ${JSON.stringify(newQuantity)}`);

    // Change local states
    setRequestList(newRequestList);
    setRequestQuantity(newQuantity);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = requestList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Change page
  const handleChangePage = async (event, newPage) => {
    console.log(`Jump to page ${newPage}`);

    // Reset data
    await updateRequestList({ page: newPage + 1, size: rowsPerPage });

    // Change page
    setPage(newPage);
    setFilterName('');
  };

  // Change row per page
  const handleChangeRowsPerPage = async (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);

    // Reset data
    await updateRequestList({ page: 1, size: newRowPerPage });

    // Back to page 1
    setPage(0);
    setRowsPerPage(newRowPerPage);
    setFilterName('');
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      console.log(`Enter pressed. Search for ${filterName}!`);

      // Update job list
      await updateRequestList({ page: 1, size: rowsPerPage });

      // Back to page 1
      setPage(0);
    }
  };

  return (
    <>
      <Helmet>
        <title> Request Log Result </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Request Log Result
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
          <RequestLogListToolbar
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
                <RequestLogListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={requestList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={requestList}>
                      {requestList.map((row, index) => {
                        const no = page * rowsPerPage + index + 1;
                        const { method, url, status, timestamp, responseTime, responseTimeUnit } = row;
                        const selectedRequestLog = selected.indexOf(timestamp) !== -1;

                        return (
                          <TableRow hover key={timestamp} tabIndex={-1} role="checkbox" selected={selectedRequestLog}>
                            <TableCell align="left">{no}</TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" marginLeft={2} spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {method}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{url}</TableCell>

                            <TableCell align="center">{status}</TableCell>

                            <TableCell align="left">{timestamp.toString()}</TableCell>

                            <TableCell align="center">
                              {responseTime} {responseTimeUnit}
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
                            No results found for username &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try other username instead.
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
            count={requestQuantity}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
async function loadRequestLogs() {
  const response = await getRequestLogs({
    page: 1,
    size: 5,
  });

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
    data: await loadRequestLogs(),
  });
}
