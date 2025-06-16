import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteHistoryTrxModal({ historyTrx, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Category"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(historyTrx?.id)}>
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete:{" "}
        <strong>{historyTrx?.name}</strong>?
      </p>
    </BaseModal>
  );
}
