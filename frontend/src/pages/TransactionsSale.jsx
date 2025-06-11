import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getCustomers } from "../services/customersService";
import { getProducts } from "../services/productsService";
import { formatRupiah } from "../utils/formatCurrency";

import {
  handleAddItem,
  handleItemChange,
  handleRemoveItem,
  handleSave,
} from "../helpers/saleHandler";

export default function TransactionPurchase() {
  const username = localStorage.getItem("username");
  const id_user = localStorage.getItem("id_user");
  const statusList = ["Paid", "Unpaid", "Cancel"];

  const [customers, setCustomers] = useState([]);
  const [selecteCustomer, setSelectedCustomer] = useState("");

  const [products, setProducts] = useState([]);

  const [status, setStatus] = useState("");
  const [items, setItems] = useState([
    { product_id: "", quantity: "", unit_price: "", total_price: "" },
  ]);
  const totalPrice = items.reduce(
    (sum, item) => sum + (parseFloat(item.total_price) || 0),
    0
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch product data", error);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-4 fw-normal">Sale Form</h1>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => handleAddItem(items, setItems)}
        >
          Add Item
        </button>
      </div>

      <form
        className="p-3 shadow rounded-2"
        style={{ backgroundColor: "#fff" }}
        onSubmit={(e) =>
          handleSave(e, items, setCustomers, setStatus, setItems, id_user)
        }
      >
        <div className="row px-3">
          <div className="col-4">
            <label className="form-label fw-medium">Customer</label>
            <select
              name="customer_id"
              className="form-select"
              value={selecteCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              required
            >
              <option value="">Select Customer</option>
              {Array.isArray(customers) &&
                customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-4">
            <label className="form-label fw-medium">Status</label>
            <select
              name="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              {statusList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-4">
            <label className="form-label fw-medium">Created By</label>
            <input
              type="text"
              className="form-control"
              value={username}
              readOnly
            />
            <input
              type="hidden"
              name="created_by"
              className="form-control"
              value={id_user}
              readOnly
            />
          </div>
        </div>

        <div className="px-3 mt-3 py-3" style={{ backgroundColor: "#F8F9FC" }}>
          <div className="row px-3">
            <div className="col-4 fw-medium">Product</div>
            <div className="col-2 fw-medium">Quantity</div>
            <div className="col-2 fw-medium">Unit Price</div>
            <div className="col-3 fw-medium">Total Price</div>
            <div className="col-1 fw-medium text-center">Action</div>
          </div>

          {items.map((item, index) => (
            <div key={index} className="row mt-2 px-2 align-items-center">
              <div className="col-4">
                <select
                  className="form-select"
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "product_id",
                      e.target.value,
                      items,
                      setItems,
                      products
                    )
                  }
                  required
                >
                  <option value="">Select Product</option>
                  {products?.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-2">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      e.target.value,
                      items,
                      setItems,
                      products
                    )
                  }
                  required
                />
              </div>

              <div className="col-2">
                <input
                  type="text"
                  className="form-control border-0 text-dark"
                  value={item.unit_price ? formatRupiah(item.unit_price) : ""}
                  readOnly
                />
              </div>

              <div className="col-3">
                <input
                  type="text"
                  className="form-control border-0 text-dark"
                  value={item.total_price ? formatRupiah(item.total_price) : ""}
                  readOnly
                />
              </div>

              <div className="col-1 text-center">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem(index, items, setItems)}
                  title="Remove item"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-end mt-4 d-flex justify-content-between align-items-center">
          <p className="fw-medium">Total: {formatRupiah(totalPrice)}</p>
          <button type="submit" className="btn btn-success">
            Save Sale
          </button>
        </div>
      </form>
    </div>
  );
}
