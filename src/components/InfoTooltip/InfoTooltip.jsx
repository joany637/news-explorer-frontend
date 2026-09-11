import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess, onLoginClick }) {
  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="info-tooltip" onClick={handleOverlayClick}>
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <p className="info-tooltip__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrada."
            : "Algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
        {isSuccess && (
          <button
            className="info-tooltip__login-link"
            type="button"
            onClick={onLoginClick}
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
