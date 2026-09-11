import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormValidation } from "../../hooks/useFormValidation";
import "../Register/Register.css";

function Login({ isOpen, onClose, onLogin, errorMessage, onSwitchToRegister }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Iniciar sesión"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        Correo electrónico
        <input
          className="form__input"
          type="email"
          name="email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.email}</span>
      </label>

      <label className="form__label">
        Contraseña
        <input
          className="form__input"
          type="password"
          name="password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.password}</span>
      </label>

      {errorMessage && <p className="form__error form__error_general">{errorMessage}</p>}

      <button className="form__submit" type="submit" disabled={!isValid}>
        Iniciar sesión
      </button>

      <button className="form__switch" type="button" onClick={onSwitchToRegister}>
        o Regístrate
      </button>
    </PopupWithForm>
  );
}

export default Login;
