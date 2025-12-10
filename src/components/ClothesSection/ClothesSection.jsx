import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";
// import Main from "../Main/Main";

export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Text</p>
        <button>Button</button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </div>
  );
}
