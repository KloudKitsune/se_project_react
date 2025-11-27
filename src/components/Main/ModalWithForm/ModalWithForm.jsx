import "./ModalWithForm.css";
import closebtn from "../../../assets/closeicon.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  name,
  activeModal,
  onClose,
  onSubmit,
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
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
