import { useContext } from "react";
import ItemCard from "../Main/ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Only show items owned by the current user
  const userItems = clothingItems.filter(
    (item) =>
      item.owner === currentUser?._id || item.owner?._id === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button onClick={handleAddClick} className="clothes-section__button">
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
