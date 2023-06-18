import { Navigate, createBrowserRouter } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import { AppLayout } from './App';
//
import TimeTablePage, { timetableLoader } from './pages/TimeTablePage';
import UserPage from './pages/UserPage';
import JobLogResultPage from './pages/JobLogResultPage';
import RequestLogResultPage from './pages/RequestLogResultPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import { action as logoutAction } from './pages/LogoutPage';
import Page404 from './pages/Page404';
import StudentDetailsPage from './pages/StudentDetailsPage';
// import DashboardAppPage from './pages/DashboardAppPage';
import JobDetailsPage, { jobDetailLoader } from './pages/JobDetailsPage';
import SettingPage from './pages/SettingPage';
import ErrorPage from './pages/ErrorPage';

// Loader
import { checkAuthLoader, tokenLoader } from './utils/auth';

// ----------------------------------------------------------------------
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Navigate to="/500" />,
    children: [
      {
        path: '/',
        id: 'root',
        loader: tokenLoader,
        element: <SimpleLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardLayout />,
            loader: checkAuthLoader,
            children: [
              {
                path: 'user',
                index: true,
                element: <UserPage />,
              },
              { 
                path: 'timetable', 
                element: <TimeTablePage />,
                loader: timetableLoader
              },
              {
                path: 'user/:id/details',
                element: <StudentDetailsPage />,
              },
              { path: 'joblog', element: <JobLogResultPage /> },
              {
                path: 'joblog/:id/details',
                element: <JobDetailsPage />,
                loader: jobDetailLoader
              },
              { path: 'requestlog', element: <RequestLogResultPage /> },
              { path: 'settings', element: <SettingPage /> },
            ],
          },
          {
            path: 'login',
            element: <LoginPage />,
            action: loginAction,
          },
          {
            path: 'logout',
            action: logoutAction,
          },
          {
            children: [
              { element: <Navigate to="/dashboard/user" />, index: true },
              { path: '404', element: <Page404 /> },
              { path: '*', element: <Navigate to="/404" /> },
            ],
          },
          {
            path: '/500',
            element: <ErrorPage />,
          },
          {
            path: '*',
            element: <Navigate to="/404" replace />,
          },
        ],
      },
    ],
  },
]);
export default router;
