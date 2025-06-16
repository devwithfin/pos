import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddRoleModal from "../components/modals/role/AddRoleModal";
import EditRoleModal from "../components/modals/role/EditRoleModal";
import DeleteRoleModal from "../components/modals/role/SoftDeleteRoleModal";
import { getRoles, saveRole, updateRole, deleteRole } from "../services/roleService";

export default function RolesData() {
  const [roles, setRoles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to Fetch Role:", error);
    }
  };

  const handleSave = async (newRole) => {
    try {
      await saveRole({ name: newRole.name });
      setShowAddModal(false);
      fetchRoles();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Role Successfully Saved",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Role.";
      Swal.fire({
        icon: "error",
        title: "Failed Save Role",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    setSelectedRole(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteRole(id);
      setShowDeleteModal(false);
      fetchRoles();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Role has been Deleted.",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't Delete Role.",
      });
    }
  };

   const handleUpdate = async (updatedData) => {
      try {
        await updateRole(updatedData.id, { name: updatedData.name });
        setShowEditModal(false);
        fetchRoles();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Role Successfully Update",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Failed to Update Role";
        Swal.fire({
          icon: "error",
          title: "Failed Update Role",
          text: errorMsg,
        });
        console.error(err);
      }
    };

  const renderColumnsWithPage = useCallback((currentPage, perPage) => {
    return [
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
              onClick={() => {
              setSelectedRole(row);
              setShowEditModal(true);
            }}
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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Table
        title="Roles Data"
        data={roles}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddRoleModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

{showEditModal && (
        <EditRoleModal
          role={selectedRole}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && selectedRole && (
        <DeleteRoleModal
          role={selectedRole}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedRole.id)}
        />
      )}
    </div>
  );
}
