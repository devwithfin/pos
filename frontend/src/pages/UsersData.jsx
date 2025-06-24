import React, { useCallback, useEffect, useState } from "react";
import Table from "../components/common/Table";
import { getUsers, saveUser, deleteUser } from "../services/userService";
import AddUserModal from "../components/modals/user/AddUserModal";
import DeleteUserModal from "../components/modals/user/SoftDeleteUserModal";
import Swal from "sweetalert2";

export default function UsersData() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to Fetch Users:", error);
    }
  };

  const handleSave = async (newUser) => {
    try {
      await saveUser({
        username: newUser.username,
        password: newUser.password,
        role_id: newUser.role_id,
      });
      setShowAddModal(false);
      fetchUsers();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Successfully Saved",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save User";
      Swal.fire({
        icon: "error",
        title: "Failed Save User",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

   const handleDelete = (row) => {
      setSelectedUser(row);
      setShowDeleteModal(true);
    };
  
    const confirmDelete = async (id) => {
      try {
        await deleteUser(id);
        setShowDeleteModal(false);
        fetchUsers();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been Deleted",
          timer: 1000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Delete Failed:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Couldn't Delete User",
        });
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
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
        width: "150px",
      },
      {
        name: "Role",
        selector: (row) => row.role_name,
        sortable: true,
        width: "585px",
      },

      {
        name: "Actions",
        cell: (row) => (
          <div className="d-flex gap-2">
              {/* <button
                onClick={() => handleEdit(row)}
                className="btn btn-sm btn-warning text-white"
                style={{ width: "70px" }}
              >
                Edit
              </button> */}
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
        title="Users Data"
        data={users}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

       {showDeleteModal && selectedUser && (
              <DeleteUserModal
                user={selectedUser}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => confirmDelete(selectedUser.id)}
              />
            )}
    </div>
  );
}
