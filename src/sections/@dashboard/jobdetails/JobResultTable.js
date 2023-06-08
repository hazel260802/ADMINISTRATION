import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.stepIdx}</TableCell>
        <TableCell component="th" scope="row">
          {row.action}
        </TableCell>
        <TableCell align="left">{row.at}</TableCell>
        <TableCell align="left">{row.output}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Nesting Logs
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>StepIdx</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell align="left">At</TableCell>
                    <TableCell align="left">Output</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.nestingLogs.map((logRow) => (
                    <TableRow key={logRow.stepIdx}>
                      <TableCell>{logRow.stepIdx}</TableCell>
                      <TableCell component="th" scope="row">
                        {logRow.action}
                      </TableCell>
                      <TableCell align="left">{logRow.at}</TableCell>
                      <TableCell align="left">
                        {logRow.output}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    stepIdx: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    at: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    nestingLogs: PropTypes.arrayOf(
      PropTypes.shape({
        stepIdx: PropTypes.number.isRequired,
        action: PropTypes.string.isRequired,
        at: PropTypes.string.isRequired,
        output: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function JobResultTable({ data }) {
  return (
    <>
    {data.map((row) => (
      <>
      <Typography variant="h5" gutterBottom>
        Worker Id: {row.workerId}
      </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>StepIdx</TableCell>
            <TableCell align="left">Action</TableCell>
            <TableCell align="left">At</TableCell>
            <TableCell align="left">Output</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <Row key={row.stepIdx} row={row} />
        </TableBody>
      </Table>
    </TableContainer>
    </>
    ))}
    </>
  );
}
