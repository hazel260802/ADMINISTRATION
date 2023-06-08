import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink, useParams } from 'react-router-dom';
import * as React from 'react';
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
  Button, 
  Tabs,
  Tab, 
  Box
} from '@mui/material';
import { Router } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import {JobDetailTable, JobResultTable} from '../sections/@dashboard/jobdetails'
// mock
import JOBDETAILS from '../_mock/jobdetails';
import LOGRESULTS from '../_mock/logdetails';


// ----------------------------------------------------------------------


const tabs = [
  { id: 'job', label: 'Job Log Details', component: JobDetailTable, data: JOBDETAILS },
  { id: 'result', label: 'Job Log Results', component: JobResultTable, data: LOGRESULTS },
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

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
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
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{children}</div>;
}
export default function StudentDetailsPage() {

  const { id } = useParams();
  
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [quantity, setQuantity] = useState(10);

  const [value, setValue] = React.useState('job');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <>
      <Helmet>
        <title> Job Details </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Job Details
          </Typography>
          <Button component={RouterLink} to={`/dashboard/settings`}  variant="contained" size="medium" color ="secondary" startIcon={<ManageAccountsIcon />}>
            Settings
          </Button>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              bgcolor: 'background.paper',
              width: '95%',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {tabs.map((tab) => (
                <LinkTab key={tab.id} label={tab.label} value={tab.id} />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: 3,
            }}
          >
              {tabs.map((tab) => (
                <TabPanel key={tab.id} value={value} index={tab.id}>
                  {value === tab.id && <tab.component id={id} data ={tab.data}/>}
                </TabPanel>
              ))}
            </Box>
        </Box>
      </Container>
    </>
  );
}
