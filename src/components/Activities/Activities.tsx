import { useSearchParams } from "react-router-dom";
import { Filters } from "../Filters/Filters";
import { ActivityCard } from "../ActivityCard/ActivityCard";
import { FadeIn } from "../FadeIn/FadeIn";
import { useEffect, useState } from "react";
import { getAllActivities } from "../../api/auth";
import { SkeletonActivityCard } from "../SkeletonAcivityCard/SkeletonActivityCard";

type Activity = {
  id: number;
  name: string;
  localDateTime: string;
  local: string;
  imgId: number;
  category: string;
  format: string;
  forWho: string;
  numberOfPeople: number;
  currentNumberOfPeople: number;
  author: {
    firstName: string;
    lastName: string;
  };
  participants: {
    email: "string";
    photoPath: "string";
  }[];
};

export const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const handleFilterBy = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const filters = {
    district: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    date: searchParams.get("date") || "",
    target: searchParams.get("target") || "",
    regime: searchParams.get("regime") || "",
  };

  useEffect(() => {
    const cached = localStorage.getItem("activities");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setActivities(parsed);
        setLoading(false);
        return; 
      }
    }

    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await getAllActivities();
        const data = response.content || [];
        localStorage.setItem("activities", JSON.stringify(data));
        setActivities(data);
      } catch (error) {
        console.error("Помилка при завантаженні активностей:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const matchesDistrict = filters.district
      ? activity.local.includes(filters.district)
      : true;
    const matchesCategory = filters.category
      ? activity.category === filters.category
      : true;
    const matchesTarget = filters.target
      ? activity.forWho === filters.target
      : true;
    const matchesDate = filters.date
      ? activity.localDateTime.startsWith(filters.date)
      : true;
    const matchesRegime = filters.regime
      ? activity.format === filters.regime
      : true;

    return (
      matchesCategory &&
      matchesTarget &&
      matchesRegime &&
      matchesDistrict &&
      matchesDate
    );
  });

  const activitiesToRender = showAll
    ? filteredActivities
    : filteredActivities.slice(0, 3);

  return (
    <section id="activities" className="activities">
      <FadeIn direction="left" delay={0.2}>
        <h1 className="activities__title">Події в місті</h1>
      </FadeIn>
      <Filters handleFilterBy={handleFilterBy} filters={filters} />
      {loading ? (
        <SkeletonActivityCard />
      ) : activitiesToRender.length > 0 ? (
        <>
          <div className="activities__list">
            {activitiesToRender.map((activity, index) => (
              <FadeIn
                key={activity.id}
                direction="up"
                delay={0.1 * index} 
              >
                <div className="activities__card">
                  <ActivityCard activity={activity} mode="activity" />
                </div>
              </FadeIn>
            ))}
          </div>
          {filteredActivities.length > 3 && (
            <FadeIn
              direction="up"
              delay={0.2}
            >
              <button
                type="button"
                className="activities__button"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "Згорнути активності" : "Переглянути всі активності"}
              </button>
            </FadeIn>
          )}
        </>
      ) : (
        <p className="activities__nothing">
          {`Нічого не знайдено за заданими фільтрами :(`}
        </p>
      )}
    </section>
  );
};
