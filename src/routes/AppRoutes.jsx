import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout      from '../layouts/MainLayout/MainLayout';
import AuthLayout      from '../layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import Home       from '../pages/Home/Home';
import About      from '../pages/About/About';
import Contact    from '../pages/Contact/Contact';
import FindProfessionals from '../pages/FindProfessionals/FindProfessionals';
import Login      from '../pages/Login/Login';
import Register   from '../pages/Register/Register';
import Dashboard  from '../pages/Dashboard/Dashboard';
import Profile    from '../pages/Dashboard/Profile';
import Inquiries  from '../pages/Dashboard/Inquiries';
import Settings   from '../pages/Dashboard/Settings';
import { ROUTES } from '../constants/routes';

const router = createBrowserRouter([
  // Public pages — MainLayout (Navbar + Footer)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,                            element: <Home /> },
      { path: ROUTES.ABOUT.slice(1),            element: <About /> },
      { path: ROUTES.CONTACT.slice(1),          element: <Contact /> },
      { path: ROUTES.FIND_PROFESSIONALS.slice(1), element: <FindProfessionals /> },
    ],
  },

  // Auth pages — AuthLayout (two-column)
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login',    element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },

  // Dashboard — DashboardLayout (sidebar)
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'inquiries', element: <Inquiries /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

const AppRoutes = () => (
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  />
);

export default AppRoutes;
