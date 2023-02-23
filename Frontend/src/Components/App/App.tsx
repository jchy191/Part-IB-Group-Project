import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Map from '../Map/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
    errorElement: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
