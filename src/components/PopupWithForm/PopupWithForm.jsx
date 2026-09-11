import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose, title, children, onSubmit }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;