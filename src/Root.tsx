import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Activities } from "./components/Activities/Activities";
import { Reviews } from "./components/Reviews/Reviews";
import { Main } from "./components/Main/Main";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="activities" element={<Activities />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="*" element={<p>Not found</p>}/>
      </Route>

    </Routes>
  </Router>
)