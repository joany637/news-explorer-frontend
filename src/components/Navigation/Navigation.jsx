import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link">
        Inicio
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/saved-news" className="navigation__link">
          Artículos guardados
        </NavLink>
      )}

      {isLoggedIn ? (
        <button className="navigation__button" onClick={onLogout}>
          {currentUser?.name} · Cerrar sesión
        </button>
      ) : (
        <button className="navigation__button" onClick={onLoginClick}>
          Iniciar sesión
        </button>
      )}
    </nav>
  );
}

export default Navigation;