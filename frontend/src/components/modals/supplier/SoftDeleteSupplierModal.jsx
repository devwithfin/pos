import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteSupplierModal({ supplier, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Supplier"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(supplier?.id)}>
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete category:{" "}
        <strong>{supplier?.name}</strong>?
      </p>
    </BaseModal>
  );
}
