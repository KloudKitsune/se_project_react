import "./ModalWithForm.css";
import closebtn from "../../../assets/closeicon.svg";

function ModalWithForm({
  children,
  title,
  buttonText = "Save",
  name,
  activeModal,
  onClose,
  onSubmit,
  isValid,
  extraActions,
  buttonGroupVariant,
  submitButtonClass = "confirm-delete__delete-button",
}) {
  const isOpen = activeModal === name;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${name}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closebtn} alt="close" />
        </button>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <div
            className={`modal__button-group ${buttonGroupVariant ? `modal__button-group--${buttonGroupVariant}` : ""}`}
          >
            <button
              type="submit"
              className={`modal__submit ${submitButtonClass || ""} ${isValid ? "modal__submit_active" : "modal__submit_disabled"}`}
              disabled={!isValid}
            >
              {buttonText}
            </button>

            {extraActions && (
              <div className="modal__extra-actions">{extraActions}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
