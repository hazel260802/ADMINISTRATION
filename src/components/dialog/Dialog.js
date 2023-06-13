import * as React from 'react';
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from '@mui/material';
// components
import Iconify from '../iconify';

export default function ScrollDialog({ data = [], type }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen()}>
        <Iconify icon={'fluent:open-16-filled'} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {type === 'log' ? (
          <>
            <DialogTitle id="scroll-dialog-title">Log Details</DialogTitle>
            <DialogContent dividers>
              {data.length > 0 ? (
                <List>
                  {data.map((item) => (
                    <ListItem key={item.jobId}>
                      <ListItemText
                        primary={`Job ID: ${item.jobId}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              Worker ID: {item.workerId}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Owner Account ID: {item.ownerAccountId}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Logs: {item.logs}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                  No data available.
                </DialogContentText>
              )}
            </DialogContent>
          </>
        ) : type === 'job' ? (
          <>
            <DialogTitle id="scroll-dialog-title">Job Details</DialogTitle>
            <DialogContent dividers>
              {data.length > 0 ? (
                <List>
                  {data.map((item) => (
                    <ListItem key={item.jobId}>
                      <ListItemText
                        primary={`Job ID: ${item.jobId}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              Owner Account ID: {item.ownerAccountId}
                              <br />
                              Username: {item.username}
                              <br />
                              Password: {item.password}
                              <br />
                              Class IDs: {item.classIds.join(', ')}
                              <br />
                              Time to Start: {item.timeToStart.toString()}
                              <br />
                              Origin Time to Start: {item.originTimeToStart.toString()}
                              <br />
                              Status: {item.status}
                              <br />
                              Created At: {item.createdAt.toString()}
                              <br />
                              Doing At: {item.doingAt.toString()}
                              <br />
                              IV: {item.iv}
                              <br />
                              Number: {item.no}
                              <br />
                              Term ID: {item.termId}
                              <br />
                              Priority: {item.priority}
                              <br />
                              Next Job ID: {item.nextJobId}
                              <br />
                              Delete Class IDs: {item.deleteClassIds.join(', ')}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                  No data available.
                </DialogContentText>
              )}
            </DialogContent>
          </>
        ) : type === 'student data' ? (
          <>
            <DialogTitle id="scroll-dialog-title">Student Information</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                  {data.map((studentData) => (
                    <img src={studentData.avatar} alt="Student Avatar" />
                  ))}
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  {data.map((studentData) => (
                    <div className="info-item">
                      <Typography component="div" variant="body2">
                        Fullname: {studentData.name}
                        <br />
                        School: {studentData.school}
                      </Typography>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </DialogContent>
          </>
        ) : (
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            No data available.
          </DialogContentText>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
