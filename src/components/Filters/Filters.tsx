import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { categories } from "../../types/Categories";
import { getDateOptions } from "../../types/Date";
import { forWho } from "../../types/ForWho";
import { kyivDistricts } from "../../types/KyivDistrict";
import { regime } from "../../types/Regime";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { FadeIn } from "../FadeIn/FadeIn";

type FilterState = {
  district: string;
  category: string;
  date: string;
  target: string;
  regime: string;
};

type Props = {
  handleFilterBy: (key: string, value: string) => void;
  filters: FilterState;
};

export const Filters: React.FC<Props> = ({ handleFilterBy, filters }) => {
  const dateOptions = getDateOptions();

  return (
    <article className="filters">
      <div className="filters__wrapper">
        <div className="filters__sort-box">
          <FadeIn direction="left" delay={0.2}>
            <div className="filters__sort">Київ</div>
          </FadeIn>
          <FadeIn direction="left" delay={0.4}>
            <CustomSelect
              options={kyivDistricts}
              onChange={(val) => handleFilterBy("district", val)}
              value={filters.district}
              classFor={"custom-select__filters"}
            />
          </FadeIn>
          <FadeIn direction="left" delay={0.6}>
            <CustomSelect
              options={categories}
              onChange={(val) => handleFilterBy("category", val)}
              value={filters.category}
              classFor={"custom-select__filters"}
            />
          </FadeIn>
          <FadeIn direction="left" delay={0.8}>
            <CustomSelect
              options={dateOptions}
              onChange={(val) => handleFilterBy("date", val)}
              value={filters.date}
              classFor={"custom-select__filters"}
            />
          </FadeIn>
          <FadeIn direction="left" delay={1.0}>
            <CustomSelect
              options={forWho}
              onChange={(val) => handleFilterBy("target", val)}
              value={filters.target}
              classFor={"custom-select__filters"}
            />
          </FadeIn>
          <FadeIn direction="left" delay={1.2}>
            <CustomSelect
              options={regime}
              onChange={(val) => handleFilterBy("regime", val)}
              value={filters.regime}
              classFor={"custom-select__filters"}
            />
          </FadeIn>
        </div>
      </div>
    </article>
  );
};
