import React from "react";
import BaseModal from "../../common/BaseModal";

export default function DeleteUserModal({ user, onClose, onConfirm }) {
  return (
    <BaseModal
      title="Delete User"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={() => onConfirm(user?.id)}>
            Delete
          </button>
        </>
      }
    >
      <p>
        Are you sure you want to delete user:{" "}
        <strong>{user?.username}</strong>?
      </p>
    </BaseModal>
  );
}
