import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
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
import Dialog from '../components/dialog';
// sections
import { JobLogListHead, JobLogListToolbar } from '../sections/@dashboard/joblog';
// mock
import JOBLOGLIST from '../_mock/joblog';
import LOGDETAILS from '../_mock/logdetails';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'studentId', label: 'StudentId', alignRight: false },
  { id: 'method', label: 'Method', alignRight: false },
  { id: 'url', label: 'URL', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'details', label: 'Details', alignRight: false },
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

export default function JobLogPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = JOBLOGLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - JOBLOGLIST.length) : 0;

  const filteredJobLog = applySortFilter(JOBLOGLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredJobLog.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Job Log Result </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Job Log Result
          </Typography>
          <Button variant="contained" size="medium" color ="secondary" startIcon={<ManageAccountsIcon />}>
            Settings
          </Button>
        </Stack>

        <Card>
          <JobLogListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <JobLogListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={JOBLOGLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredJobLog.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { no, studentId, method, url, status} = row;
                    const selectedJobLog = selected.indexOf(studentId) !== -1;

                    return (
                      <TableRow hover key={studentId} tabIndex={-1} role="checkbox" selected={selectedJobLog}>

                        <TableCell align="left">{no}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" marginLeft={2} spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {studentId}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{method}</TableCell>

                        <TableCell align="left">{url}</TableCell>

                        <TableCell align="left">{status}</TableCell>

                        <TableCell align="left">
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                data={LOGDETAILS}
                                type={'log'}
                              />
                        </TableCell>

                      </TableRow>
                      
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={JOBLOGLIST.length}
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
