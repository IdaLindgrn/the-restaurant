import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import BookingPage from "./views/BookingPage";
import ContactPage from "./views/ContactPage";
import Layout from "./components/Layout";
import AdminPage from "./views/AdminPage";
import GdprPage from "./views/GdprPage";
import AdminMoreDetails from "./views/AdminMoreDetailsPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <LandingPage></LandingPage>,
      },
      {
        path: "/admin",
        element: <AdminPage></AdminPage>,
      },
      {
        path: "/admin/:id",
        element: <AdminMoreDetails></AdminMoreDetails>,
      },
      {
        path: "/book",
        element: <BookingPage></BookingPage>,
      },
      {
        path: "/contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "/gdpr",
        element: <GdprPage></GdprPage>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
