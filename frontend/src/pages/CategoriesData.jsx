import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import { getCategories, saveCategory } from "../services/categoriesService";

export default function CategoriesData() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    }
  };

  const handleSave = async (newCategory) => {
    try {
      await saveCategory({ name: newCategory.name });
      setShowModal(false);
      fetchCategories();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category Successfully Saved!",
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
        title="Categories Data"
        data={categories}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
