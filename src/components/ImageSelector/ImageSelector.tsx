import { useState } from "react";
import { useActivityStore } from "../../store/useActivityStore";

const imageOptions = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `img/activity/activity-${i + 1}.png`,
}));

type Props = {
  photoId: number;
  onSelect: (id: number) => void;
};

export const ImageSelector: React.FC<Props> = ({ photoId, onSelect }) => {
  const handleSelect = (id: number) => {
    onSelect(id);
  };

  return (
    <div className="imageSelector">
      {imageOptions.map(({ id, src }) => (
        <div
          key={id}
          className={`imageSelector__item ${
            photoId === id ? "imageSelector__item--selected" : ""
          }`}
          onClick={() => handleSelect(id)}
        >
          <img
            src={src}
            alt={`Image ${id}`}
            className={`imageSelector__img ${
              photoId === id ? "imageSelector__img--selected" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};
