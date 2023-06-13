import { RouterProvider, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export function AppLayout() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Outlet />
      </ThemeProvider>
    </HelmetProvider>
  );
}
export default function App() {
  return <RouterProvider router={router} />;
}
