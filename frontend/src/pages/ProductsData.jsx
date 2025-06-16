import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/common/Table";
import { formatRupiah } from "../utils/formatCurrency";
import AddProductModal from "../components/modals/product/AddProductModal";
import EditProductModal from "../components/modals/product/EditProductModal";
import DeleteProductModal from "../components/modals/product/SoftDeleteProductModal";
import {
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export default function ProductsData() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to Fetch Product Data:", error);
    }
  };

  const handleSave = async (newProduct) => {
    try {
      await saveProduct(newProduct);
      setShowAddModal(false);
      fetchProducts();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product Successfully Saved",
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

  const handleUpdate = async (updatedData) => {
    try {
      await updateProduct(updatedData.id, {
        name: updatedData.name,
        sku: updatedData.sku,
        category_id: updatedData.category_id,
        unit: updatedData.unit,
        price: updatedData.price,
        cost_price: updatedData.cost_price,
        stock: updatedData.stock,
      });
      setShowEditModal(false);
      fetchProducts();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product Successfully Update",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to Update Product";
      Swal.fire({
        icon: "error",
        title: "Failed Update Product",
        text: errorMsg,
      });
      console.error(err);
    }
  };

  const handleDelete = (row) => {
    setSelectedProduct(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      console.log("Deleting product ID:", id);
      await deleteProduct(id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
      fetchProducts();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product has been Deleted.",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Couldn't Delete Product",
      });
    }
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
      name: "Category",
      selector: (row) => row.category_name,
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
      name: "Price",
      selector: (row) => formatRupiah(row.price),
      sortable: true,
      width: "150px",
    },
    {
      name: "Cost Price",
      selector: (row) => formatRupiah(row.cost_price),
      sortable: true,
      width: "150px",
    },
    {
      name: "Stock",
      selector: (row) => `${row.stock} ${row.unit}`,
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            onClick={() => {
              setSelectedProduct(row);
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
        title="Products Data"
        data={products}
        renderColumnsWithPage={renderColumnsWithPage}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}

      {showEditModal && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete(selectedProduct.product_id)}
        />
      )}
    </div>
  );
}
