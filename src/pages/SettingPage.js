import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
} from '@mui/material';

export default function SettingPage() {
  const [termId, setTermId] = useState('');
  const [crawlJobCycle, setCrawlJobCycle] = useState('');
  const [dkhptdJobCycle, setDkhptdJobCycle] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault();
    // Perform update logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const renderTextField = (label, value, onChange) => {
    return (
    <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        variant="outlined"
        fullWidth
        required
    />
    )
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleUpdate}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              Term ID
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {renderTextField('Term ID', termId, setTermId)}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              Crawl Job Cycle
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {renderTextField('Crawl Job Cycle', crawlJobCycle, setCrawlJobCycle)}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              DKHPTD Job Cycle
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {renderTextField('DKHPTD Job Cycle', dkhptdJobCycle, setDkhptdJobCycle)}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              From
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {renderTextField('From', from, setFrom)}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              To
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {renderTextField('To', to, setTo)}
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" >
                Update
            </Button>
            <Button variant="outlined" onClick={handleCancel} sx={{ ml: 2 }}>
                Cancel
            </Button>
        </Box>
      </form>
    </Container>
  );
}
