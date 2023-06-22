import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Typography, OutlinedInput, InputAdornment, Stack } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import JobLogSort from './JobLogSort';
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onSubmit: PropTypes.func,
  currentSemester: PropTypes.string,
  handleFilterSemester: PropTypes.func,
  semesterList: PropTypes.array
};

export default function UserListToolbar({ 
  numSelected, filterName, 
  onFilterName, onSubmit,
  currentSemester, semesterList, handleFilterSemester,
}) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        onKeyDown={onSubmit}
        placeholder="Student ID"
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 1 }}>
        <JobLogSort 
          currentSemester={currentSemester} 
          semesterList={semesterList}
          handleFilterSemester={handleFilterSemester} 
        />
      </Stack>
    </StyledRoot>
  );
}
