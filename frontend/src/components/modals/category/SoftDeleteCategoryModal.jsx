import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteCategoryModal({ category, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Category"
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
        Are you sure you want to delete category:{" "}
        <strong>{category?.name}</strong>?
      </p>
    </BaseModal>
  );
}
