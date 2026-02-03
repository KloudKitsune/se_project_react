import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";

function Header({
  handleAddClick,
  weatherData,
  onOpenLogin,
  onOpenRegister,
  // isLoggedIn, // pass this from App.jsx
}) {
  const currentUser = useContext(CurrentUserContext);
  const showUser = Boolean(currentUser);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (!currentUser) return null;

    if (currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }

    // fallback: first letter of name or "?"
    const firstLetter = currentUser.name?.[0]?.toUpperCase() || "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  // If user info is not ready yet, show auth buttons
  if (!showUser) {
    return (
      <header className="header">
        <NavLink className="header__nav-link" to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>

        <ToggleSwitch />

        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__signup-btn"
            onClick={onOpenRegister}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__login-btn"
            onClick={onOpenLogin}
          >
            Log In
          </button>
        </div>
      </header>
    );
  }

  // User info is ready, render profile
  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img src={logo} alt="Logo" className="header__logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          {renderAvatar()}
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
