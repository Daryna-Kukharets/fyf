import { CameraCapture } from "../CameraCapture/CameraCapture";

type Props = {
  photo: string | null;
  isProfile: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCamera: () => void;
  showCamera: boolean;
  onCapture: (dataUrl: string) => void;
  onCloseCamera: () => void;
};

export const UserPhotoUploader: React.FC<Props> = ({
  photo,
  isProfile,
  onUpload,
  onOpenCamera,
  showCamera,
  onCapture,
  onCloseCamera,
}) => (
  <div className="userPhotoUploader">
      <img
        src={photo || "img/icons/take-photo.svg"}
        alt="avatar"
        className="userPhotoUploader__photo"
      />
    <div className="userPhotoUploader__buttons">
      <label className="userPhotoUploader__button userPhotoUploader__button--add">
        {isProfile ? "Змінити фото" : "Додати фото"}
        <input type="file" accept="image/*" onChange={onUpload} hidden />
      </label>
      <button
        type="button"
        className="userPhotoUploader__button userPhotoUploader__button--take"
        onClick={onOpenCamera}
      >
        {isProfile ? "Зробити нове фото" : "Зробити фото"}
      </button>
    </div>
    {showCamera && (
      <CameraCapture onCapture={onCapture} onClose={onCloseCamera} />
    )}
  </div>
);
