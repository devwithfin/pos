import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddRoleModal from "../components/modals/AddRoleModal";
import { getRoles, saveRole } from "../services/rolesService";

export default function RolesData() {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Gagal mengambil data role:", error);
    }
  };

  const handleSave = async (newRole) => {
    try {
      await saveRole({ name: newRole.name });
      setShowModal(false);
      fetchRoles();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Role Successfully Saved!",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Role";
      Swal.fire({
        icon: "error",
        title: "Failed Save Role",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete:", row);
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      width: "50px",
    },
    {
      name: "Role Name",
      selector: (row) => row.name,
      sortable: true,
      width: "768px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="btn btn-sm btn-warning text-white"
            style={{ width: "70px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="btn btn-sm btn-danger"
            style={{ width: "70px" }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "225px",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Table
        title="Roles Data"
        data={roles}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <AddRoleModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
