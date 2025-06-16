import React from "react";
import BaseModal from "../../common/BaseModal";

export default function RestoreModal({ item, onClose, onConfirm }) {
  return (
    <BaseModal
      title={`Restore ${item?.type}`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={() => onConfirm(item)}>
            Restore
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to restore {" "}
        <strong>{item?.name}</strong>?
      </p>
    </BaseModal>
  );
}
