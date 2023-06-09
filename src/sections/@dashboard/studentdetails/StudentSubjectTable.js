import { useState } from 'react';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
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
  { id: 'termId', label: 'Term Id', alignRight: false },
  { id: 'subjectId', label: 'Subject Id', alignRight: false },
  { id: 'subjectName', label: 'Subject Name', alignRight: false },
  { id: 'subjectVolume', label: 'Subject Volume', alignRight: false },
  { id: 'classId', label: 'Class Id', alignRight: false },
  { id: 'midtermGrade', label: 'MidTerm Grade', alignRight: false },
  { id: 'finalGrade', label: 'Final Grade', alignRight: false },
  { id: 'letterGrade', label: 'Letter Grade', alignRight: false },
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
  const [page] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage] = useState(10);


  const handleRequestSort = (property) => {
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
                  {filteredDetails.map((row) => {
                    const {
                      termId,
                      subjectId,
                      subjectName,
                      subjectVolume,
                      classId,
                      midtermGrade,
                      finalGrade,
                      letterGrade,
                    } = row;
                    const selectedUser = selected.indexOf(subjectId) !== -1;

                    return (
                      <TableRow hover key={subjectId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell align="left">{termId}</TableCell>

                        <TableCell align="left">{subjectId}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {subjectName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{subjectVolume}</TableCell>

                        <TableCell align="left">{classId}</TableCell>

                        <TableCell align="left">{midtermGrade}</TableCell>

                        <TableCell align="left">{finalGrade}</TableCell>

                        <TableCell align="left">{letterGrade}</TableCell>
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

        </Card>
      </Container>
    </>
  );
}
StudentGPATable.propTypes = {
  data: PropTypes.array.isRequired,
};