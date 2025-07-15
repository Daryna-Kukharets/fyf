import { useState } from "react"

const imageOptions = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `img/activity/activity-${i + 1}.png`
}))

export const ImageSelector = () => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (id: number) => {
    setSelected(id);
  }

  return (
    <div className="imageSelector">
      {imageOptions.map(({ id, src }) => (
        <div 
          key={id}
          className={`imageSelector__item ${selected === id ? "imageSelector__item--selected" : ""}`}
          onClick={() => handleSelect(id)}
          >
          <img 
            src={src} 
            alt={`Image ${id}`} 
            className={`imageSelector__img ${selected === id ? "imageSelector__img--selected" : ""}`}
          />
        </div>
      ))}
    </div>
  )
}