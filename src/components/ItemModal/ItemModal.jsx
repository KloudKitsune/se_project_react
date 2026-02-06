import "./ItemModal.css";
import closebtn from "../../assets/closeicon-white.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);

  // Guard against missing data
  if (!card) return null;

  // Check ownership
  const isOwn =
    card.owner === currentUser?._id || card.owner?._id === currentUser?._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closebtn} alt="close" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer-left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isLoggedIn && isOwn && (
            <button
              type="button"
              className="modal__button-delete"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
