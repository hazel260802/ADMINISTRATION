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
  Box,
} from '@mui/material';
import { Router } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import {
  StudentGPATable,
  StudentInfo,
  StudentLanguageTable,
  StudentSubjectTable,
} from '../sections/@dashboard/studentdetails';
// mock
import GPA_DATA from '../_mock/gpadata';
import SUBJECTDATA from '../_mock/subjectdata';
import LANGUAGEDATA from '../_mock/languagedata';
import STUDENTDETAILS from '../_mock/studentdetails';

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

const tabs = [
  { id: 'info', label: 'Student Information', component: StudentInfo, data: STUDENTDETAILS },
  { id: 'language', label: 'Language Grade', component: StudentLanguageTable, data: LANGUAGEDATA },
  { id: 'subject', label: 'Subject Grade', component: StudentSubjectTable, data: SUBJECTDATA },
  { id: 'semester', label: 'Subject Semester', component: StudentGPATable, data: GPA_DATA },
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

  const [value, setValue] = React.useState('info');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      const newSelecteds = GPA_DATA.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - GPA_DATA.length) : 0;

  const filteredUsers = applySortFilter(GPA_DATA, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student Details
          </Typography>
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
                {value === tab.id && <tab.component id={id} data={tab.data} />}
              </TabPanel>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}
