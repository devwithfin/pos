import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddCategoryModal from "../components/modals/category/AddCategoryModal";
import EditCategoryModal from "../components/modals/category/EditCategoryModal";
import DeleteCategoryModal from "../components/modals/category/SoftDeleteCategoryModal";

import {
  getCategories,
  saveCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export default function CategoriesData() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to Fetch Category Data:", error);
    }
  };

  const handleSave = async (newCategory) => {
    try {
      await saveCategory({ name: newCategory.name });
      setShowAddModal(false);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category Successfully Saved",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Category";
      Swal.fire({
        icon: "error",
        title: "Failed Save Category",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateCategory(updatedData.id, { name: updatedData.name });
      setShowEditModal(false);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category Successfully Update",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to Update Category";
      Swal.fire({
        icon: "error",
        title: "Failed Update Category",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    setSelectedCategory(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteCategory(id);
      setShowDeleteModal(false);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category has been Deleted",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't Delete Category",
      });
    }
  };

  const renderColumnsWithPage = (currentPage, perPage) => [
    {
      name: "#",
      selector: (row, index) => (currentPage - 1) * perPage + index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Categories Name",
      selector: (row) => row.name,
      sortable: true,
      width: "735px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedCategory(row);
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

  return (
    <div className="container mx-auto p-4">
      <Table
        title="Categories Data"
        data={categories}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

      {showEditModal && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedCategory.id)}
        />
      )}
    </div>
  );
 }
