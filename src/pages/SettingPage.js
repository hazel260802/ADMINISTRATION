import dayjs from 'dayjs';
import { useState, Suspense } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useLoaderData, useActionData, json, defer, Await, Form, useSubmit, redirect } from 'react-router-dom';
import { Container, Typography, TextField, Grid, Button, Box, Select, MenuItem } from '@mui/material';
import { getSettings, updateJobCycle, updateDkhptdTime } from '../services/settings';

export default function SettingPage() {
  const data = useActionData();

  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');

  const handleFromChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToChange = (date) => {
    setSelectedToDate(date);
  };
  const { settings } = useLoaderData();

  const submit = useSubmit();
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const settings = {
      crawl_cycle: form.elements.crawl_cycle.value + form.elements.crawl_cycle_unit.value,
      dkhptd_cycle: form.elements.dkhptd_cycle.value + form.elements.dkhptd_cycle_unit.value,
      from: new Date(form.elements.from.value).getTime() / 1000,
      to: new Date(form.elements.to.value).getTime() / 1000,
    };

    submit(settings, { method: 'post', action: '/dashboard/settings/job-cycle' });
    submit(settings, { method: 'post', action: '/dashboard/settings/dkhptd-time' });
  };

  const handleCancel = () => redirect('/dashboard/settings');


  const renderTextField = ({ name, unit, defaultValue, helperText }) => {
    const defaultUnit = defaultValue.slice(-1);
    defaultValue = parseInt(defaultValue.slice(0, -1), 10);

    return (
      <>
        <TextField
          name={name}
          variant="outlined"
          required
          type="number"
          defaultValue={defaultValue}
          // error={error}
          helperText={helperText}
        />
        <Select
          sx={{ width: '100px' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={unit}
          defaultValue={defaultUnit}
          label="Age"
          autoWidth
          // onChange={handleChange}
        >
          <MenuItem value={'s'}>Second</MenuItem>
          <MenuItem value={'m'}>Minute</MenuItem>
          <MenuItem value={'h'}>Hour</MenuItem>
          <MenuItem value={'d'}>Day</MenuItem>
        </Select>
      </>
    );
  };

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={settings}>
        {(loadedSettings) => (
          <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
              Settings
            </Typography>
            <Form onSubmit={handleUpdate}>
              <Grid container spacing={2} alignItems="center">
                {/* <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Term ID
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {renderTextField({
                    name: 'termId',
                    label: 'TermId',
                    value: loadedSettings.termIds[0],
                    // onChange: setTermId,
                  })}
                </Grid> */}
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Student Information
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {renderTextField({
                    name: 'crawl_cycle',
                    unit: 'crawl_cycle_unit',
                    label: 'Crawl Cycle',
                    defaultValue: loadedSettings.crawl_cycle,
                    error: data,
                    helperText: data ? data.errors[0].msg : '',
                  })}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Course Register
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {renderTextField({
                    name: 'dkhptd_cycle',
                    unit: 'dkhptd_cycle_unit',
                    label: 'Dkhptd Cycle',
                    defaultValue: loadedSettings.dkhptd_cycle,
                  })}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    From
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <input
                    name="from"
                    type="text"
                    value={selectedFromDate ? selectedFromDate.toString() : new Date(loadedSettings.from * 1000)}
                    // defaultValue={dayjs(new Date(loadedSettings.from * 1000))}
                    style={{ display: 'none' }}
                    readOnly
                  />
                  <DateTimePicker
                    fullWidth
                    defaultValue={dayjs(new Date(loadedSettings.from * 1000))}
                    // value={selectedFromDate}
                    onChange={handleFromChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    To
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <input
                    name="to"
                    type="text"
                    value={selectedToDate ? selectedToDate.toString() : new Date(loadedSettings.to * 1000)}
                    style={{ display: 'none' }}
                    // defaultValue={dayjs(new Date(loadedSettings.to * 1000))}
                    readOnly
                  />
                  <DateTimePicker
                    fullWidth
                    defaultValue={dayjs(new Date(loadedSettings.to * 1000))}
                    // value={selectedToDate}
                    onChange={handleToChange}
                  />
                </Grid>
              </Grid>

              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
                <Button variant="outlined" onClick={handleCancel} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </Form>
          </Container>
        )}
      </Await>
    </Suspense>
  );
}

async function loadSettings() {
  const response = await getSettings();

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch settings.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export function loader() {
  return defer({
    settings: loadSettings(),
  });
}

export async function jobCycleAction({ request }) {
  const data = await request.formData();
  const jobCycle = {
    crawlCycle: data.get('crawl_cycle'),
    dkhptdCycle: data.get('dkhptd_cycle'),
  };
  const response = await updateJobCycle(jobCycle);

  if (response.status === 401 || response.status === 400 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not update job cycle.' }, { status: 500 });
  }

  return redirect('/dashboard/settings');
}

export async function dkhptdTimeAction({ request }) {
  const data = await request.formData();
  const time = {
    from: data.get('from'),
    to: data.get('to'),
  };
  const response = await updateDkhptdTime(time);

  if (response.status === 401 || response.status === 400 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not update jdkhptd time.' }, { status: 500 });
  }

  return redirect('/dashboard/settings');
}
