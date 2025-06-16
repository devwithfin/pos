import React, { useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function AddCustomerModal({onClose, onSave }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      contact.trim() === "" 
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
      contact: contact.trim()
    });
  };

  return (
    <BaseModal
      title="Add Customer"
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
          <label className="form-label fw-medium">Customer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control border border-dark"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-medium">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="form-control border border-dark"
          />
        </div>
      </form>
    </BaseModal>
  );
}
