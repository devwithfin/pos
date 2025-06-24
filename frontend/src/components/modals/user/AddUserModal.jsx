import React, { useEffect, useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import { getRoles } from "../../../services/roleService";

export default function AddUserModal({ onClose, onSave }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch role data:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      selectedRole === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly",
      });
      return;
    }

    onSave({
      username: username.trim(),
      password: password.trim(),
      role_id: Number(selectedRole),
    });
  };

  return (
    <BaseModal
      title="Add User"
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
        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label fw-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control border border-dark"
            />
          </div>

          <div className="mb-3 col-6">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border border-dark"
            />
          </div>

          <div className="mb-3 col-12">
            <label className="form-label fw-medium">Role</label>
            <select
              name="role_id"
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              {Array.isArray(roles) &&
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
