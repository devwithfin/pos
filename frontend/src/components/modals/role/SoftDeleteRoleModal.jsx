import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteRoleModal({ role, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete Role"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (role?.id) {
                onConfirm(role.id);
              } else {
                console.error("Role ID is undefined.");
              }
            }}
          >
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete role:{" "}
        <strong>{role?.name}</strong>?
      </p>
    </BaseModal>
  );
}
