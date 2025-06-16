import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteCustomerModal({ customer, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Customer"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(customer?.id)}>
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete customer:{" "}
        <strong>{customer?.name}</strong>?
      </p>
    </BaseModal>
  );
}
