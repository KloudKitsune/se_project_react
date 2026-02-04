import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";
import { useNavigate } from "react-router-dom"; // ✅ import

const LoginModal = ({ onClose, activeModal, onLogin, onOpenRegister }) => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate(); // ✅ hook

  const isValid = values.email.trim() !== "" && values.password.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoginError(false);

    onLogin(values)
      .then(() => {
        closeActiveModal();
        navigate("/profile"); // ✅ redirect to /profile
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  function handleInputChange(evt) {
    if (loginError) setLoginError(false);
    handleChange(evt);
  }

  const closeActiveModal = () => {
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={activeModal === "login"}
      title="Log in"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      extraActions={
        <button
          type="button"
          className="modal__link-button"
          onClick={() => {
            onClose();
            onOpenRegister();
          }}
        >
          or Sign Up
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
          onChange={handleInputChange}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          required
          value={values.password}
          onChange={handleInputChange}
        />
      </label>

      {loginError && (
        <span className="modal__error">Email or password incorrect</span>
      )}
    </ModalWithForm>
  );
};

export default LoginModal;
