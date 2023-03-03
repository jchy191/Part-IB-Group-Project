import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import ResponsiveDrawer from '../Drawer/Drawer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ResponsiveDrawer />,
    errorElement: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
