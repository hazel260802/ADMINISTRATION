import PropTypes from 'prop-types';

import { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// --------------------------------------------------------------------

JobLogSort.propTypes = {
  currentSemester: PropTypes.string,
  handleFilterSemester: PropTypes.func,
  semesterList: PropTypes.array
};

export default function JobLogSort({ currentSemester, semesterList, handleFilterSemester }) {
  // State
  const [open, setOpen] = useState(null);

  // Close and open menu
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Semester:&nbsp;&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {currentSemester}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {semesterList.map((semester) => (
          <MenuItem
            key={semester}
            selected={semester === semesterList[0]}
            onClick={
              async () => {
                handleClose()
                await handleFilterSemester(semester)
              }
            }
            sx={{ typography: 'body2' }}
          >
            {semester}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
