import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getItems, removeItem, getCurrentUser } from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { updateProfile } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItem } from "../../utils/api";

import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null when not logged in
  const isLoggedIn = Boolean(currentUser);
  const [authChecked, setAuthChecked] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setAuthChecked(true); // no token, we're done checking
      return;
    }

    checkToken(token)
      .then((userData) => {
        // setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        // setIsLoggedIn(false);
        setCurrentUser(null);
      })
      .finally(() => {
        setAuthChecked(true); // ✅ auth check complete
      });
  }, []);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]); //defaultClothingItems
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openDeleteConfirm = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
    setSelectedCard({});
  };

  const confirmDeleteHandler = () => {
    if (!itemToDelete) return;
    deleteItemHandler(itemToDelete._id);
    setItemToDelete(null);
    closeActiveModal();
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    closeActiveModal();
  };

  const deleteItemHandler = (itemID) => {
    const token = localStorage.getItem("jwt"); // get the token

    removeItem(itemID, token) // pass token
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== itemID),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  //Register
  const onRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => {
        // automatically log the user in after registration
        return login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
        // setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  //Login
  const onLogin = ({ email, password }) => {
    return login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return getCurrentUser(data.token); // 👈 NEW
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      });
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  // Open Edit Profile by setting activemodal to edit-profile
  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  // Update Profile
  const handleUpdateProfile = ({ name, imageUrl }) => {
    const token = localStorage.getItem("jwt");

    // Call API endpoint to update user
    return updateProfile({ name, avatar: imageUrl }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // update the user context
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    // setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Create new card
  const onAddItem = (inputValues) => {
    // const newCardData = {
    //   name: inputValues.name,
    //   imageUrl: inputValues.imageUrl,
    //   weather: inputValues.weather,
    // };
    const token = localStorage.getItem("jwt");

    addItem(inputValues, token) // pass token as second argument
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onOpenLogin={openLoginModal}
                onOpenRegister={openRegisterModal}
                // isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      authChecked={authChecked}
                    >
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleLogout={handleLogout}
                        onOpenEditProfile={openEditProfileModal}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            {/* <ModalWithForm
          name="add-garment"
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
        ></ModalWithForm> */}
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              activeModal={activeModal}
              onRegister={onRegister}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              activeModal={activeModal}
              // setCurrentUser={setCurrentUser}
              // setIsLoggedIn={setIsLoggedIn}
              onLogin={onLogin}
              onOpenRegister={openRegisterModal}
            />

            <AddItemModal
              buttonText="Add garment" //may need to remove
              activeModal={activeModal} //may need to remove
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              onClose={closeActiveModal}
              card={selectedCard}
              onDelete={openDeleteConfirm}
            />

            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete"}
              activeModal={activeModal}
              onClose={cancelDelete}
              onConfirm={confirmDeleteHandler}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              activeModal={activeModal}
              onUpdateProfile={handleUpdateProfile}
              defaultValues={{
                name: currentUser?.name || "",
                imageUrl: currentUser?.avatar || "",
              }}
            />
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
