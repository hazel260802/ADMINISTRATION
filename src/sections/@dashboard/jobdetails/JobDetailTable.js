import { useState } from 'react';
import PropTypes from 'prop-types'

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

// Utils
import { fUnixTime } from '../../../utils/formatTime'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'key', label: 'Key', alignRight: false },
  { id: 'value', label: 'Value', alignRight: false },
];

const KEY_TITLE = [
  { id: 'columnKey', value: 'username', label: 'Username', alignRight: false },
  { id: 'columnKey', value: 'termId', label: 'TermId', alignRight: false },
  { id: 'columnKey', value: 'classIds', label: 'Class Ids', alignRight: false },
  { id: 'columnKey', value: 'status', label: 'Status', alignRight: false },
  { id: 'columnKey', value: 'createdAt', label: 'Created At', alignRight: false },
  { id: 'columnKey', value: 'timeToStart', label: 'Time To Start', alignRight: false },
  { id: 'columnKey', value: 'doingAt', label: 'Doing At', alignRight: false },
];

const STATUS = {
  0: 'Ready',
  1: 'Doing',
  2: 'Pending',
  20: 'Canceled',
  21: 'Done',
  22: 'Failed',
};

// ----------------------------------------------------------------------
StudentGPATable.propTypes = {
  jobId: PropTypes.string,
  data: PropTypes.object
}


export default function StudentGPATable({ jobId, data }) {
  
  // local states
  const [order, ] = useState('asc');
  const [selected, ] = useState([]);
  const [orderBy, ] = useState('name');

  const processedData = [data]
  const isNotFound = !data

  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                {!isNotFound && 
                <>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={processedData.length}
                    numSelected={selected.length}
                    onRequestSort={console.log('Request sort!')}
                    onSelectAllClick={console.log('Select all click')}
                  />

                  <TableBody>
                    {processedData.map((row) => {
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
                                <TableCell align="left">{classIds.join(', ')}</TableCell>
                              ): key.value === 'timeToStart' ? (
                                <TableCell align="left">{fUnixTime(timeToStart)}</TableCell>
                              ): key.value === 'status' ? (
                                <TableCell align="left">{STATUS[status]}</TableCell>
                              ): key.value === 'createdAt' ? (
                                <TableCell align="left">{fUnixTime(Math.round(createdAt / 1000))}</TableCell>
                              ): key.value === 'doingAt' ? (
                                <TableCell align="left">{doingAt === -1 ? 'Not start yet' : fUnixTime(doingAt)}</TableCell>
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

                  </TableBody> 
                </>}

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
                            Job id &nbsp;
                            <strong>&quot;{jobId}&quot;</strong>.
                            <br /> Job information not found!
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
