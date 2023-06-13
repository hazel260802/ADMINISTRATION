import { useState } from 'react';
import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Typography,
  TableContainer,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
} from '@mui/material';
// components
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead } from '../user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'key', label: 'Key', alignRight: false },
  { id: 'value', label: 'Value', alignRight: false },
];

const KEY_TITLE = [
  { id: 'columnKey', value: 'studentId', label: 'Student Id', alignRight: false },
  { id: 'columnKey', value: 'name', label: 'Full Name', alignRight: false },
  { id: 'columnKey', value: 'yearOfAdmission', label: 'Year Of Admission', alignRight: false },
  { id: 'columnKey', value: 'degreeProgram', label: 'Degree Program', alignRight: false },
  { id: 'columnKey', value: 'program', label: 'Program', alignRight: false },
  { id: 'columnKey', value: 'school', label: 'School', alignRight: false },
  { id: 'columnKey', value: 'studyStatus', label: 'Study Status', alignRight: false },
  { id: 'columnKey', value: 'gender', label: 'Gender', alignRight: false },
  { id: 'columnKey', value: 'studentClass', label: 'Class', alignRight: false },
  { id: 'columnKey', value: 'cohort', label: 'Cohort', alignRight: false },
  { id: 'columnKey', value: 'email', label: 'Email', alignRight: false },
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

  const handleOpenOption = (event, id) => {
    setOpen(id);
  };

  const handleCloseOption = () => {
    setOpen(null);
  };

  const handleDeleteUsers = () => {
    console.log('Delete:', selected);
  };

  const handleSelectOne = (studentId) => {
    setSelected((prevSelected) => {
      if (!prevSelected.includes(studentId)) {
        return [...prevSelected, studentId];
      }
      return prevSelected.filter((id) => id !== studentId);
    });
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredDetails = applySortFilter(data, getComparator(order, orderBy), filterName);
  const emptyRows = page > 0 ? Math.max(0, 1 + page - data.length) : 0;
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
                  {filteredDetails.map((row) => {
                    const {
                      studentId,
                      name,
                      yearOfAdmission,
                      degreeProgram,
                      program,
                      school,
                      studyStatus,
                      gender,
                      studentClass,
                      cohort,
                      email,
                    } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <>
                        {KEY_TITLE.map((key) => (
                          <TableRow
                            hover
                            key={studentId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" padding="none">
                              {key.id === 'columnKey' && (
                                <Stack direction="row" alignItems="center" align="center" spacing={5}>
                                  <Typography marginLeft={2} align="center" variant="subtitle2" noWrap>
                                    {key.label}
                                  </Typography>
                                </Stack>
                              )}
                            </TableCell>
                            {key.value === 'studentId' ? (
                              <TableCell align="left">{studentId}</TableCell>
                            ) : key.value === 'name' ? (
                              <TableCell align="left">{name}</TableCell>
                            ) : key.value === 'yearOfAdmission' ? (
                              <TableCell align="left">{yearOfAdmission}</TableCell>
                            ) : key.value === 'degreeProgram' ? (
                              <TableCell align="left">{degreeProgram}</TableCell>
                            ) : key.value === 'program' ? (
                              <TableCell align="left">{program}</TableCell>
                            ) : key.value === 'school' ? (
                              <TableCell align="left">{school}</TableCell>
                            ) : key.value === 'studyStatus' ? (
                              <TableCell align="left">{studyStatus}</TableCell>
                            ) : key.value === 'gender' ? (
                              <TableCell align="left">{gender}</TableCell>
                            ) : key.value === 'studentClass' ? (
                              <TableCell align="left">{studentClass}</TableCell>
                            ) : key.value === 'cohort' ? (
                              <TableCell align="left">{cohort}</TableCell>
                            ) : key.value === 'email' ? (
                              <TableCell align="left">{email}</TableCell>
                            ) : (
                              <TableCell align="left">{'Error!'}</TableCell>
                            )}
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
        </Card>
      </Container>
    </>
  );
}
