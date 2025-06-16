import React, { useEffect, useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

export default function EditCategoryModal({category, onClose, onSave }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
    }
  }, [category]);


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
      id: category.id,
      name: name.trim(),
    });
  };

  return (
    <BaseModal
      title="Edit Category"
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
          <label className="form-label fw-medium">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control border border-dark                                                                                                                       "
          />
        </div>
      </form>
    </BaseModal>
  );
}
