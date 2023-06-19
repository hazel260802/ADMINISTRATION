import { useState } from 'react';
import PropTypes from 'prop-types';

// components
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// utils
import { fUnixTime } from '../../../utils/formatTime'
import { shortenString } from '../../../utils/formatString'

ResultRow.propTypes = {
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
  workerId: PropTypes.string,
};

const MAX_LENGTH = 40

function formatObject(object, maxLength) {
  const rows = Object.keys(object).map((key) => `${key}: ${shortenString(JSON.stringify(object[key]), maxLength)}`)
  return (
    <>
      {rows.map((row) => (
        <>
          {row}<br />
        </>
      ))}
    </>
  )
}

function formatOutput(output, maxLength) {
  return typeof(output) === 'string' ? shortenString(output, maxLength) : 
    typeof(output) === 'number' ? shortenString(output, maxLength) : 
    Array.isArray(output)  ? shortenString(output.join(', '), maxLength) :
    typeof(output) === 'object' ? formatObject(output, maxLength) : 'None'
}

export default function ResultRow({ workerId, row }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main row */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        {row.nestingLogs && row.nestingLogs.length ? 
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="medium"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> :
          <TableCell />
        }

        <TableCell align="left">
          {row.stepIdx + 1}
        </TableCell>

        
        <TableCell component="th" scope="row">
          {shortenString(row.action, MAX_LENGTH)}
        </TableCell>
        
        <TableCell align="left">
          {fUnixTime(Math.round(row.at / 1000), false)}
        </TableCell>

        <TableCell align="left">
          {row.output? formatOutput(row.output, MAX_LENGTH) : 'None'}
        </TableCell>
      
      </TableRow>
      
      {/* Dropdown row */}
      {(row.nestingLogs && !!row.nestingLogs.length) && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              
              <Box sx={{ margin: 1 }}>
                
                <Typography variant="subtitle2" gutterBottom component="div">
                  Nesting Logs
                </Typography>
                
                <Table size="small" aria-label="purchases">
                  
                  <TableHead>
                    <TableRow>
                      <TableCell width="100" align="left">Step</TableCell>
                      <TableCell align="left">Action</TableCell>
                      <TableCell align="left">At</TableCell>
                      <TableCell align="left">Output</TableCell>
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {
                      row.nestingLogs.map((logRow) => (
                        
                        <TableRow key={`${workerId}.${logRow.nestingLevel}.${logRow.stepIdx}`}>
                          
                          <TableCell>
                            {logRow.stepIdx + 1}
                          </TableCell>
                          
                          <TableCell component="th" scope="row">
                            {shortenString(logRow.action, MAX_LENGTH)}
                          </TableCell>
                          
                          <TableCell align="left">
                            {fUnixTime(Math.round(logRow.at / 1000), true)}
                          </TableCell>
                          
                          <TableCell align="left">
                            {logRow.output ? formatOutput(logRow.output, MAX_LENGTH) : 'None'}
                          </TableCell>

                        </TableRow>
                      ))
                    }
                  </TableBody>
                  
                </Table>
              </Box>
              
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}