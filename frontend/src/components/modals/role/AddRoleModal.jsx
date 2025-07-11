import React, { useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddRoleModal({onClose, onSave }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" 
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please Fill in All Fields Correctly",
      });
      return;
    }

    onSave({
      name: name.trim(),
    });
  };

  return (
    <BaseModal
      title="Add Role"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control border border-dark"
          />
        </div>
      </form>
    </BaseModal>
  );
}
