import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const data = useActionData();

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post">
        <Stack spacing={3}>
          {!data && <TextField name="username" label="Username" required />}
          {!data && (
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              color={data && data.error && 'warning'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}

          {data && !data.success && <TextField name="username" label="Username" required error />}
          {data && !data.success && (
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              helperText={data.message}
              error
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Login'}
        </LoadingButton>
      </Form>
    </>
  );
}
