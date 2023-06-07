import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import TimeTablePage from './pages/TimeTablePage';
import UserPage from './pages/UserPage';
import JobLogResultPage from './pages/JobLogResultPage';
import RequestLogResultPage from './pages/RequestLogResultPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'timetable', element: <TimeTablePage /> },
        { 
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'user/:id/details',
          element: <StudentDetailsPage />,
        },
        { path: 'joblog', element: <JobLogResultPage /> },
        { path: 'requestlog', element: <RequestLogResultPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);

  return routes;
}
