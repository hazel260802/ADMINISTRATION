import { Navigate, createBrowserRouter } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import { AppLayout } from './App';
//
import TimeTablePage, { timetableLoader } from './pages/TimeTablePage';
import UserPage, {loader as studentsLoader} from './pages/UserPage';
import JobLogResultPage from './pages/JobLogResultPage';
import RequestLogResultPage, {loader as resquestLogLoader} from './pages/RequestLogResultPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import { action as logoutAction } from './pages/LogoutPage';
import Page404 from './pages/Page404';
import StudentDetailsPage, { loadStudent as studentLoader } from './pages/StudentDetailsPage';
// import DashboardAppPage from './pages/DashboardAppPage';
import JobDetailsPage, { jobDetailLoader } from './pages/JobDetailsPage';
import SettingPage, { loader as settingsLoader, jobCycleAction, dkhptdTimeAction } from './pages/SettingPage';
import ErrorPage from './pages/ErrorPage';
// Loader
import { checkAuthLoader, tokenLoader } from './utils/auth';

// ----------------------------------------------------------------------
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Navigate to="/500" />,
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
                loader: studentsLoader,
              },
              {
              path: 'timetable',
              element: <TimeTablePage />,
              loader: timetableLoader,
              },
              {
                path: 'user/:id/details',
                element: <StudentDetailsPage />,
                loader: studentLoader,
              },
              { path: 'joblog', element: <JobLogResultPage /> },
              {
                path: 'joblog/:id/details',
                element: <JobDetailsPage />,
                loader: jobDetailLoader,
              },
              { 
                path: 'requestlog', 
                element: <RequestLogResultPage />,
                loader: resquestLogLoader,
                children: [
                  {
                    path: ':username/:page/:size',
                    index: true,
                  }
                ]
              },
              {
                path: 'settings',
                children: [
                  {
                    index: true,
                    element: <SettingPage />,
                    loader: settingsLoader,
                  },
                  {
                    path: 'job-cycle',
                    element: <Navigate to="/dashboard/settings" replace />,
                    action: jobCycleAction,
                  },
                  {
                    path: 'dkhptd-time',
                    element: <Navigate to="/dashboard/settings" replace />,
                    action: dkhptdTimeAction,
                  },
                ],
              },
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
