import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onUpdateProfile,
  onClose,
  activeModal,
  defaultValues,
}) => {
  const { values, handleChange, setValues } = useForm(defaultValues);
  const isFormValid =
    values.name.trim() !== "" && values.imageUrl.trim() !== "";
  // When the modal opens, reset the form to defaultValues
  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, defaultValues, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile(values)
      .then(() => {
        setValues(defaultValues); // resets to defaultValues
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit Profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      activeModal={activeModal}
      isValid={isFormValid}
    >
      <label className="modal__label">
        Name*{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Avatar"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
