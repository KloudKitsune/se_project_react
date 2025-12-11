import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
// import { defaultClothingItems } from "../../utils/constants";
import { getItems, removeItem } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import { addItem } from "../../utils/api";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
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

  const deleteItemHandler = (itemID) => {
    removeItem(itemID)
      .then(() => {
        // Remove the deleted item from state so UI updates
        setClothingItems(clothingItems.filter((item) => item._id !== itemID));
        closeActiveModal(); // Close the modal after deletion
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    // const newCardData = {
    //   name: inputValues.name,
    //   imageUrl: inputValues.imageUrl,
    //   weather: inputValues.weather,
    // };

    addItem(inputValues, {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl, // <--- FIX
      weather: inputValues.weather,
    })
      .then((data) => {
        setClothingItems([data, ...clothingItems]); //inputValues
        closeActiveModal();
      })
      .catch(console.error);

    //.catch()
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
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                  />
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
            onDelete={deleteItemHandler}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
