import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Typography,
  TableContainer,
  TablePagination,
  Link,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// mock
import GPA_DATA from '../_mock/gpadata';
import SUBJECTDATA from '../_mock/ubjectdata';
import LANGUAGEDATA from '../_mock/languagedata';

// ----------------------------------------------------------------------

// Modify the TABLE_HEAD constant to match your desired table headers
const TABLE_HEAD = [
  { id: 'subject', label: 'Subject', alignRight: false },
  { id: 'grade', label: 'Grade', alignRight: false },
];



export default function StudentGradePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Helmet>
        <title>Student Grades</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student Grades
          </Typography>
          <Link component={RouterLink} to="/user" variant="body1">
            Back to User Page
          </Link>
        </Stack>

        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            {/* GPA Table */}
            <TableContainer>
              <Table>
                <TableBody>
                  {GPA_DATA.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Subject Grade Table */}
            <TableContainer>
              <Table>
                <TableBody>
                    {SUBJECTDATA.map((row, index) => (
                        <TableRow key={index}>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Language Grade Table */}
            <TableContainer>
              <Table>
                <TableBody>
                    {LANGUAGEDATA.map((row, index) => (
                        <TableRow key={index}>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={GPA_DATA.length}
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
