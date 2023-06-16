import { Helmet } from 'react-helmet-async';
import { json, redirect } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
// import Iconify from '../components/iconify';
import { LoginForm } from '../sections/auth/login';
import { login as loginService } from '../services/auth';
import { dotenv } from 'dotenv';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

<<<<<<< HEAD
=======
  async function handleFormSubmit(data) {
    const mode = data.mode || 'login';

    if (mode !== 'login' && mode !== 'signup') {
      throw new Error('Unsupported mode.');
    }

    try {
      const response = await fetch(`${process.dotenv.domain}/api/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Could not authenticate user.');
      }

      const resData = await response.json();
      const token = resData.token;

      localStorage.setItem('token', token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem('expiration', expiration.toISOString());

      // Redirect using client-side navigation after successful authentication
      window.location.href = '/';  // Replace with your desired URL
    } catch (error) {
      console.error(error);
    }
  }

>>>>>>> 624ea78 (Update)
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const response = await loginService(authData);

  if (response.status === 401 || response.status === 400 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.data.token;

  localStorage.setItem('token', token);

  return redirect('/dashboard/user');
}
