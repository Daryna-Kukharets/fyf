import { BackPath } from "../../components/BackPath/BackPath"

export const Participants = () => {
  return (
    <div className="participants">
      <BackPath />
      <h1 className="participants__title">
        Список учасників
      </h1>
      <div className="participants__card">
        <img 
          src="img/icons/take-photo.svg" 
          alt="photo" 
          className="participants__img"
        />
        <div className="participants__info">
          <h3 className="participants__name">
            Андрій
          </h3>
          <p className="participants__phone">
            + 380 (95) 566 48 32
          </p>
        </div>
      </div>
    </div>
  )
}