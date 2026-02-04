import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

const RegisterModal = ({ onRegister, onClose, activeModal, onOpenLogin }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  const isValid =
    values.email.trim() !== "" &&
    values.password.trim() !== "" &&
    values.name.trim() !== "" &&
    values.avatar.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      isOpen={activeModal === "register"}
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      extraActions={
        <button
          type="button"
          className="modal__link-button"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          or Log In
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          minLength="6"
          value={values.password}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          required
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
