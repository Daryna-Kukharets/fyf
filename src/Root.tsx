import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { MainPage } from "./pages/MainPage/MainPage";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./components/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Plans } from "./pages/Plans/Plans";
import { Participants } from "./pages/Participants/Participants";
import { CreateActivity } from "./pages/CreateActivity/CreateActivity";

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
        {
          path: "registration",
          element: <Registration />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "plans",
          element: <Plans />,
        },
        {
          path: "participants",
          element: <Participants />,
        },
        {
          path: "create-activity",
          element: <CreateActivity />,
        },
      ],
    },
  ],
  {
    basename: "/fyf/",
  }
);
