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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [position, setPosition] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  useLayoutEffect(() => {
    const updateMaxTranslate = () => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (container && content) {
        const containerWidth = container.offsetWidth;
        const contentWidth = content.scrollWidth;
        const maxScroll = Math.max(contentWidth - containerWidth, 0);
        setMaxTranslate(-maxScroll);
        setPosition((prev) => Math.min(0, Math.max(prev, -maxScroll)));
      }
    };
    updateMaxTranslate();
    window.addEventListener("resize", updateMaxTranslate);
    return () => window.removeEventListener("resize", updateMaxTranslate);
  }, []);
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setStartX(e.clientX);
    setPosition((prev) => {
      let next = prev + delta;
      next = Math.min(0, Math.max(next, maxTranslate));
      return next;
    });
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);
  return (
    <article className="filters">
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={`filters__wrapper ${
          isDragging ? "filters__wrapper--dragging" : ""
        }`}
      >
        <div className="filters">
          <div
            className="filters__sort-box"
            ref={contentRef}
            style={{
              display: "inline-flex",
              transform: `translateX(${position}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
              whiteSpace: "nowrap",
            }}
          >
            <FadeIn direction="left" delay={0.2}>
              <div className="filters__sort">Київ</div>
            </FadeIn>
            <FadeIn direction="left" delay={0.4}>
              <CustomSelect
                options={kyivDistricts}
                onChange={(val) => handleFilterBy("district", val)}
                value={filters.district}
              />
            </FadeIn>
            <FadeIn direction="left" delay={0.6}>
              <CustomSelect
                options={categories}
                onChange={(val) => handleFilterBy("category", val)}
                value={filters.category}
              />
            </FadeIn>
            <FadeIn direction="left" delay={0.8}>
              <CustomSelect
                options={dateOptions}
                onChange={(val) => handleFilterBy("date", val)}
                value={filters.date}
              />
            </FadeIn>
            <FadeIn direction="left" delay={1.0}>
              <CustomSelect
                options={forWho}
                onChange={(val) => handleFilterBy("target", val)}
                value={filters.target}
              />
            </FadeIn>
            <FadeIn direction="left" delay={1.2}>
              <CustomSelect
                options={regime}
                onChange={(val) => handleFilterBy("regime", val)}
                value={filters.regime}
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </article>
  );
};
