import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleLogout,
  onOpenEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="profile">
      <SideBar
        onLogout={handleLogout}
        onOpenEditProfile={onOpenEditProfile}
        currentUser={currentUser}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
