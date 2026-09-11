import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormValidation } from "../../hooks/useFormValidation";
import "./Register.css";

function Register({ isOpen, onClose, onRegister, errorMessage, onSwitchToLogin }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Regístrate"
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
          minLength={8}
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.password}</span>
      </label>

      <label className="form__label">
        Nombre de usuario
        <input
          className="form__input"
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={30}
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="form__error">{errors.name}</span>
      </label>

      {errorMessage && <p className="form__error form__error_general">{errorMessage}</p>}

      <button className="form__submit" type="submit" disabled={!isValid}>
        Registrarse
      </button>

      <button className="form__switch" type="button" onClick={onSwitchToLogin}>
        o Iniciar sesión
      </button>
    </PopupWithForm>
  );
}

export default Register;
