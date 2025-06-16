import React, { useEffect, useState } from "react";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import { getCategories } from "../../../services/categoryService"; // pastikan file-nya ada

export default function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const unitList = ["unit", "pcs", "btl", "pack"];

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setSku(product.sku || "");
      setCategoryId(product.category_id?.toString() || "");
      setUnit(product.unit || "");
      setPrice(product.price || "");
      setCostPrice(product.cost_price || "");
      setStock(product.stock || "");
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories(); // asumsi ini return { data: [...] }
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !sku.trim() ||
      !categoryId ||
      !unit.trim() ||
      !price ||
      !costPrice ||
      !stock
    ) {
      Swal.fire({
        icon: "error",
        title: "Incomplete or Invalid Data",
        text: "Please fill in all fields correctly",
      });
      return;
    }

    onSave({
      id: product.product_id,
      name: name.trim(),
      sku: sku.trim(),
      category_id: Number(categoryId),
      unit: unit.trim(),
      price: Number(price),
      cost_price: Number(costPrice),
      stock: Number(stock),
    });
  };

  return (
    <BaseModal
      title="Edit Product"
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
            <label className="form-label fw-medium">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control border border-dark"
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label fw-medium">Category</label>
            <select
              name="category_id"
              className="form-select border border-dark"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-6">
            <label className="form-label fw-medium">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="form-control border border-dark"
            />
          </div>
          <div className="mb-3 col-6">
            <label className="form-label fw-medium">Type</label>
            <select
              name="unit"
              className="form-select border border-dark"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              {unitList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-4">
            <label className="form-label fw-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control border border-dark"
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label fw-medium">Cost Price</label>
            <input
              name="cost_price"
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="form-control border border-dark"
            />
          </div>
          <div className="mb-3 col-4">
            <label className="form-label fw-medium">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="form-control border border-dark"
            />
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
