import { useSearchParams } from "react-router-dom";
import { Filters } from "../Filters/Filters";
import { ActivityCard } from "../ActivityCard/ActivityCard";
import { FadeIn } from "../FadeIn/FadeIn";

export const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterBy = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);

    setSearchParams(params);
  };

  const filters = {
    district: searchParams.get("district") || "",
    category: searchParams.get("category") || "",
    date: searchParams.get("date") || "",
    target: searchParams.get("target") || "",
    regime: searchParams.get("regime") || "",
  };

  return (
    <section id="activities" className="activities">
      <FadeIn direction="left" delay={0.2}>
        <h1 className="activities__title">Події в місті</h1>
      </FadeIn>
      <Filters handleFilterBy={handleFilterBy} filters={filters} />
      <ActivityCard mode="activity" />
    </section>
  );
};
