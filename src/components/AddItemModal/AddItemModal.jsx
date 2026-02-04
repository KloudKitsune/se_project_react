import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, onClose, activeModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  // ✅ validity check for submit button
  const isValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weather !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      isOpen={activeModal === "add-garment"}
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      isValid={isValid} // ✅ now submit enables correctly
    >
      <label htmlFor="addItem-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="addItem-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="addItem-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="addItem-imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label
          htmlFor="addItem-hot"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="addItem-hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio-input"
            onChange={handleChange}
          />{" "}
          Hot
        </label>

        <label
          htmlFor="addItem-warm"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="addItem-warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio-input"
            onChange={handleChange}
          />{" "}
          Warm
        </label>

        <label
          htmlFor="addItem-cold"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="addItem-cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio-input"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
