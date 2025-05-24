import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Activities } from "./components/Activities/Activities";
import { Reviews } from "./components/Reviews/Reviews";
import { Main } from "./components/Main/Main";

export const router = createBrowserRouter([
   {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'activities',
        element: <Activities />,
      },
      {
        path: 'reviews',
        element: <Reviews />,
      },
      {
        path: '*',
        element: <p>Not found</p>,
      },
    ],
  },
]);