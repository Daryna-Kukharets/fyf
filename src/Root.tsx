import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { MainPage } from "./pages/MainPage/MainPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <p>Not found</p>,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
      //   {
      //     path: "about-us",
      //     element: <AboutUs />,
      //   },
      ],
    },
  ],
  {
    basename: "/fyf/",
  }
);
