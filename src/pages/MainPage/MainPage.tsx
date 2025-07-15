import { useEffect, useState } from "react";
import { AboutUs } from "../../components/AboutUs/AboutUs";
import { Activities } from "../../components/Activities/Activities";
import { Main } from "../../components/Main/Main";
import { Reviews } from "../../components/Reviews/Reviews";
import { Loader } from "../../components/Loader/Loader";

export const MainPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Main />
      <AboutUs />
      <Activities />
      <Reviews />
    </>
  );
};
