import PropTypes from 'prop-types';

// mui
import { 
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';

import ResultRow from './ResultRow';

// ----------------------------------------------------------------------------------
JobResultTable.propTypes = {
  data: PropTypes.array,
  jobId: PropTypes.string
}

export default function JobResultTable({ jobId, data: workerData }) {
  const isNotFound = !workerData || !workerData.length

  return (
    <>
      {
        !isNotFound && workerData.map((worker, index) => (
          <>
            <Container>
              {/* Worker info */}
              <Typography 
                sx={{
                  marginTop: 3
                }} 
                variant="body1" 
                gutterBottom
              >
                <strong>Worker {index + 1}:</strong>{`\xa0\xa0\xa0`}{worker.workerId}
              </Typography>

              {/* Worker logs */}
              <TableContainer component={Paper}>
                <Table 
                  sx={{
                    fontSize: 10
                  }} 
                  aria-label="collapsible table"
                >
                  
                  <TableHead>
                    <TableRow>
                      <TableCell>Detail</TableCell>
                      <TableCell>Step</TableCell>
                      <TableCell align="left">Action</TableCell>
                      <TableCell align="left">At</TableCell>
                      <TableCell align="left">Output</TableCell>
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {worker.logs.map((step) => (
                      <ResultRow workerId={worker.workerId} key={`${worker.workerId}.${step.nestingLevel}.${step.stepIdx}`} row={step} />
                    ))}
                      
                  </TableBody>

                </Table>
              </TableContainer>
            </Container>
          </>
        ))}

      {isNotFound && (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
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
                      <br /> Job results not found!
                    </Typography>
                  </Paper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
