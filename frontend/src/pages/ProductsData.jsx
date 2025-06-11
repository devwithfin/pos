import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import { formatRupiah } from "../utils/formatCurrency";
import AddProductModal from "../components/modals/AddProductModal";
import { getProducts, saveProduct } from "../services/productsService";

export default function ProductsData() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const handleSave = async (newProduct) => {
    try {
      await saveProduct(newProduct);
      setShowModal(false);
      fetchProducts();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product Successfully Saved!",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to Save Product";
      Swal.fire({
        icon: "error",
        title: "Failed Save Product",
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
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      width: "180px",
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      sortable: true,
      width: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => `${row.name}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Price",
      selector: (row) => {
        return `${formatRupiah(row.price)}`;
      },

      sortable: true,
      width: "150px",
    },
    {
      name: "Cost Price",
      selector: (row) => {
        return `${formatRupiah(row.cost_price)}`;
      },

      sortable: true,
      width: "150px",
    },
    {
      name: "Stock",
      selector: (row) => `${row.stock} ${row.unit}`,
      sortable: true,
      width: "150px",
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
        title="Products Data"
        data={products}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
