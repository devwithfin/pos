import React from "react";
import BaseModal from "../../common/BaseModal";

export default function RestoreCategoryModal({ category, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Restore Category"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(category?.id)}>
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to restore category:{" "}
        <strong>{category?.name}</strong>?
      </p>
    </BaseModal>
  );
}
