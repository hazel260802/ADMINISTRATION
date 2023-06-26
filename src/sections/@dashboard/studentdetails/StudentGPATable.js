import { useState } from 'react';
import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
} from '@mui/material';
// components
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead} from '../user';

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

export default function StudentGPATable({ data }) {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (newPage) => {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredDetails = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredDetails.length && !!filterName;

  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      termId,
                      GPA,
                      CPA,
                      passCredits,
                      accumulatedCredits,
                      debtCredits,
                      registeredCredits,
                      studentLevel,
                      warningLevel,
                    } = row;
                    const selectedUser = selected.indexOf(termId) !== -1;

                    return (
                      <TableRow hover key={termId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell align="left">{termId}</TableCell>

                        <TableCell align="left">{GPA}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {CPA}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{passCredits}</TableCell>

                        <TableCell align="left">{accumulatedCredits}</TableCell>

                        <TableCell align="left">{debtCredits}</TableCell>

                        <TableCell align="left">{registeredCredits}</TableCell>

                        <TableCell align="left">{studentLevel}</TableCell>

                        <TableCell align="left">{warningLevel}</TableCell>
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
            rowsPerPageOptions={[10, 15,20, 25]}
            component="div"
            count={data.length}
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
