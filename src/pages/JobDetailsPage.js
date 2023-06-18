import { useState } from 'react';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useLoaderData, useParams } from 'react-router-dom';

// @mui
import {
  Stack,
  Typography,
  Container,
  Button, 
  Tabs,
  Tab, 
  Box
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// sections
import {JobDetailTable, JobResultTable} from '../sections/@dashboard/jobdetails'

// services
import { getJobDetail, getJobResult } from '../services/jobs';

// ----------------------------------------------------------------------

TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.string,
  index: PropTypes.string
}

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{children}</div>;
}


function LinkTab(props) {
  return (
    <Tab
      component="a"
      sx={{
        minWidth: 300
      }}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}


export default function StudentDetailsPage() {

  // Loader data
  const { jobDetail: loadedJobDetail, jobResults: loadedJobResults } = useLoaderData()

  // Params
  const { id } = useParams();
  
  // Local states
  const [value, setValue] = useState('job');
  const [jobDetail, ] = useState(loadedJobDetail)
  const [jobResults, ] = useState(loadedJobResults)

  // Tab configs
  const tabs = [
    // Job detail page
    { 
      id: 'job', 
      label: 'Job Detail', 
      component: JobDetailTable, 
      jobId: id,
      data: jobDetail 
    },
    // Job result page
    { 
      id: 'result', 
      label: 'Job Result', 
      component: JobResultTable, 
      jobId: id,
      data: jobResults 
    },
  ];

  // Handlers
  // Tab change
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              bgcolor: 'background.paper',
              width: '100%',
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
                  {value === tab.id && <tab.component id={id} jobId={tab.jobId} data={tab.data}/>}
                </TabPanel>
              ))}
            </Box>
        </Box>
      </Container>
    </>
  );
}

export async function jobDetailLoader ({ params }){

  const jobId = params.id
  console.log(`Job ID: ${jobId}`)

  // Get job details
  console.log('Loading job detail...')
  const jobDetailResponse = await getJobDetail(jobId)

  const jobDetailData = await(jobDetailResponse.json())

  if (!jobDetailResponse.ok) {
    console.log(`Error code: ${jobDetailResponse.status}`)
    console.log(`Error message: ${jobDetailData.message}`)
  }

  const jobDetail = jobDetailData.data
  console.log(`Loaded job detail: ${JSON.stringify(jobDetail)}`)

  // get job results
  console.log('Loading job result...')
  const jobResultResponse = await getJobResult(jobId)

  const jobResultData = await(jobResultResponse.json())

  if (!jobResultResponse.ok) {
    console.log(`Error code: ${jobResultResponse.status}`)
    console.log(`Error message: ${jobResultData.message}`)
  }

  const jobResults = jobResultData.data
  console.log(`Loaded job results: ${JSON.stringify(jobResults)}`)

  return { jobDetail, jobResults }
}