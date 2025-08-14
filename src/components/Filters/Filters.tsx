import { categories } from "../../types/Categories";
import { getDateOptions } from "../../types/Date";
import { forWho } from "../../types/ForWho";
import { kyivDistricts } from "../../types/KyivDistrict";
import { regime } from "../../types/Regime";
import { getDateLabel } from "../../utils/getDateLabel";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { FadeIn } from "../FadeIn/FadeIn";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

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

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const toggleSelect = (key: string) => {
    setOpenSelect((prev) => (prev === key ? null : key));
  };

  const handleChangeAndClose = (key: string, value: string) => {
    handleFilterBy(key, value);
    setOpenSelect(null);
  };

  return (
    <article className="filters">
      <div className="filters__wrapper">
        <Swiper spaceBetween={8} slidesPerView="auto" grabCursor>
          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={0.2}>
              <div className="filters__sort">Київ</div>
            </FadeIn>
          </SwiperSlide>

          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={0.4}>
              <CustomSelect
                options={kyivDistricts}
                onChange={(val) => handleChangeAndClose("location", val)}
                value={filters.district}
                classFor={"custom-select__filters"}
                placeholder="Райони"
                isOpen={openSelect === "district"}
                onToggle={() => toggleSelect("district")}
              />
            </FadeIn>
          </SwiperSlide>

          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={0.6}>
              <CustomSelect
                options={categories}
                onChange={(val) => handleChangeAndClose("category", val)}
                value={filters.category}
                classFor={"custom-select__filters"}
                placeholder="Категорії"
                isOpen={openSelect === "category"}
                onToggle={() => toggleSelect("category")}
              />
            </FadeIn>
          </SwiperSlide>

          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={0.8}>
              <CustomSelect
                options={dateOptions}
                onChange={(val) => handleChangeAndClose("date", val)}
                value={filters.date}
                customLabel={getDateLabel(filters.date)}
                classFor={"custom-select__filters"}
                placeholder="Дата"
                isOpen={openSelect === "date"}
                onToggle={() => toggleSelect("date")}
              />
            </FadeIn>
          </SwiperSlide>

          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={1.0}>
              <CustomSelect
                options={forWho}
                onChange={(val) => handleChangeAndClose("target", val)}
                value={filters.target}
                classFor={"custom-select__filters"}
                placeholder="Для кого"
                isOpen={openSelect === "target"}
                onToggle={() => toggleSelect("target")}
              />
            </FadeIn>
          </SwiperSlide>

          <SwiperSlide style={{ width: "auto" }}>
            <FadeIn direction="left" delay={1.2}>
              <CustomSelect
                options={regime}
                onChange={(val) => handleChangeAndClose("regime", val)}
                value={filters.regime}
                classFor={"custom-select__filters"}
                placeholder="Формат"
                isOpen={openSelect === "regime"}
                onToggle={() => toggleSelect("regime")}
              />
            </FadeIn>
          </SwiperSlide>
        </Swiper>
      </div>
    </article>
  );
};
