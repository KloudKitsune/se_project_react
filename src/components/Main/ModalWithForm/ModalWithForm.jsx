import "./ModalWithForm.css";
import closebtn from "../../../assets/closeicon.svg";

function ModalWithForm({ children, title, buttonText }) {
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close">
            <img src={closebtn} alt="close" />
          </button>
          <form className="modal__form">
            {children}
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
