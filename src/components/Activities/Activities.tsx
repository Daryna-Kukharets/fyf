import { useSearchParams } from "react-router-dom";
import { Filters } from "../Filters/Filters";
import { ActivityCard } from "../ActivityCard/ActivityCard";

export const Activity = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter") || "";

  const handleFilterBy = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("filter", option);

    setSearchParams(params);
  };
  return (
    <div id="activities" className="activities">
      <h1 className="activities__title">Події в місті</h1>
      <Filters handleFilterBy={handleFilterBy} filter={filter} />
      <ActivityCard />
    </div>
  );
};
