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
  Button
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'key', label: 'Key', alignRight: false },
  { id: 'value', label: 'Value', alignRight: false },
];

const KEY_TITLE = [
  { id: 'columnKey', value: 'username', label: 'Username', alignRight: false },
  { id: 'columnKey', value: 'classIds', label: 'Class Ids', alignRight: false },
  { id: 'columnKey', value: 'timeToStart', label: 'Time To Start', alignRight: false },
  { id: 'columnKey', value: 'status', label: 'Status', alignRight: false },
  { id: 'columnKey', value: 'createAt', label: 'Created At', alignRight: false },
  { id: 'columnKey', value: 'doingAt', label: 'Doing At', alignRight: false },
  { id: 'columnKey', value: 'termId', label: 'TermId', alignRight: false },
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
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [quantity, setQuantity] = useState(10);

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
                    const { username, classIds, timeToStart, status, createdAt, doingAt, termId} = row;
                    const selectedKey = selected.indexOf(KEY_TITLE.label) !== -1;

                    return (
                    <>
                    {KEY_TITLE.map((key) => (
                      <TableRow hover key={key.label} tabIndex={-1} role="checkbox" selected={selectedKey} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                        <TableCell component="th" scope="row" padding="none">
                          {key.id === 'columnKey' && (
                            <Stack direction="row" alignItems="center" align="center" spacing={5}>
                              <Typography marginLeft={2} align="center" variant="subtitle2" noWrap>
                                {key.label}
                              </Typography>
                            </Stack>
                          )}
                        </TableCell>
                          {key.value === 'username' ? (
                              <TableCell align="left">{username}</TableCell>
                            ): key.value === 'classIds' ? (
                              <TableCell align="left">{classIds}</TableCell>
                            ): key.value === 'timeToStart' ? (
                              <TableCell align="left">{timeToStart}</TableCell>
                            ): key.value === 'status' ? (
                              <TableCell align="left">{status}</TableCell>
                            ): key.value === 'createdAt' ? (
                              <TableCell align="left">{createdAt}</TableCell>
                            ): key.value === 'doingAt' ? (
                              <TableCell align="left">{doingAt}</TableCell>
                            ): key.value === 'termId' ? (
                              <TableCell align="left">{termId}</TableCell>
                            ): (
                              <TableCell align="left">{'Error!'}</TableCell>
                            )
                          }
                      </TableRow>
                  ))}

                </>
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
