import "./ItemCard.css";
import likedIcon from "../../../assets/like/liked.svg";
import unlikedIcon from "../../../assets/like/unliked.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  console.log("onCardLike prop:", onCardLike);
  console.log("item:", item);

  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.includes(currentUser?._id);

  const handleCardClick = () => onCardClick(item);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // prevent image click from opening modal
    onCardLike(item, isLiked); // toggle like
  };

  return (
    <li className="card">
      <div className="card__image-wrapper">
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
        {currentUser && (
          <div className="card__overlay">
            <div className="card__header">
              <h2 className="card__name">{item.name}</h2>
              <img
                className="card__like"
                src={isLiked ? likedIcon : unlikedIcon}
                alt={isLiked ? "Liked" : "Not liked"}
                onClick={handleLikeClick}
              />
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
