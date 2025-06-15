import { AboutUs } from "../../components/AboutUs/AboutUs";
import { Activity } from "../../components/Activities/Activities";
import { Main } from "../../components/Main/Main";
import { Reviews } from "../../components/Reviews/Reviews";

export const MainPage = () => {
  return (
    <>
      <Main />
      <AboutUs />
      <Activity />
      <Reviews />
    </>
  );
};
