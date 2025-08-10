import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalErrorProps = {
  message?: string;
  onClose: () => void;
};

export const PortalError = ({
  message = "Для цієї дії потрібна авторизація.",
  onClose,
}: PortalErrorProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const removeTimeout = setTimeout(() => {
      onClose();
    }, 3000 + 300);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={`portalError ${
        visible ? "portalError--visible" : "portalError--hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="portalError__content"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="portalError__text">{message}</p>
        <button className="portalError__close" onClick={onClose}>
          <img
            src="img/icons/close.svg"
            alt="close"
            className="portalError__img"
          />
        </button>
      </div>
    </div>,
    document.body
  );
};
