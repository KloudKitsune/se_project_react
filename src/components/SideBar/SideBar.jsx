import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

export default function SideBar({ onLogout, onOpenEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) return null;

  const firstLetter = currentUser.name?.[0]?.toUpperCase() || "?";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{firstLetter}</div>
        )}

        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="sidebar__btn-container">
        <button
          type="button"
          className="sidebar__profile-edit-btn"
          onClick={onOpenEditProfile}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
