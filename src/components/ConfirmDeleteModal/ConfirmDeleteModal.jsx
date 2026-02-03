import ModalWithForm from "../Main/ModalWithForm/ModalWithForm";

function ConfirmDeleteModal({ onClose, onConfirm, activeModal }) {
  return (
    <ModalWithForm
      name="confirm-delete"
      // title="Delete item"
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
      isValid={true}
      buttonText="Yes, delete item"
      buttonGroupVariant="stacked" // ✅ use stacked variant
      submitButtonClass="confirm-delete__delete-button"
      extraActions={
        <button
          type="button"
          onClick={onClose}
          className="modal__button-cancel"
        >
          Cancel
        </button>
      }
    >
      <p className="modal__confirm-text">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__confirm-text">This action is irreversible.</p>
    </ModalWithForm>
  );
}

export default ConfirmDeleteModal;
