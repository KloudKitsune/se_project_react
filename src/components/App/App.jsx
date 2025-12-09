import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { defaultClothingItems } from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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

  const onAddItem = (inputValues) => {
    // call the fetch function, declare in seperate file
    //handle it with .then((data) => {}) which will include all the stuff below goes into the .then
    //Dont' use inputValues because it wont have ID
    //ID will be included in the response data
    setClothingItems([...clothingItems, inputValues]);
    closeActiveModal();
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
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            clothingItems={clothingItems}
            weatherData={weatherData}
            handleCardClick={handleCardClick}
          />
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
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
