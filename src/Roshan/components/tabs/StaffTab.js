import React from "react";

export default function StaffTab({
  orders,
  setOrders, // not used now but kept
  orderSearch,
  setOrderSearch,
  orderFilter,
  setOrderFilter,
  filteredOrders,
  openOrderAdd,
  openOrderEdit,
  orderModalOpen,
  setOrderModalOpen,
  orderForm,
  setOrderForm,
  orderEditing,
  saveOrder,
  deleteOrder,
}) {
  return (
    <>
      <div className="cb-actionbar">
        <input
          type="text"
          className="cb-search"
          placeholder="Search orders…"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
        />

        <button className="cb-add" onClick={openOrderAdd}>
          + Add New Order
        </button>

        <div className="cb-filterbar">
          <label>Filter:</label>
          <select
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Served</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="cb-tablecard">
        <table className="cb-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Table</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="cb-row">
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.item}</td>
                <td>{o.qty}</td>
                <td>{o.table}</td>
                <td>
                  <span className={`cb-badge ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <div className="cb-actions-col">
                    <button
                      className="edit-btn"
                      onClick={() => openOrderEdit(o)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(o.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orderModalOpen && (
        <div
          className="cb-modal-backdrop"
          onClick={(e) =>
            e.target === e.currentTarget && setOrderModalOpen(false)
          }
        >
          <div className="cb-modal">
            <h2>{orderEditing ? "Edit Order" : "New Order"}</h2>

            <input
              type="text"
              placeholder="Order ID (optional)"
              value={orderForm.id}
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  id: e.target.value ? Number(e.target.value) : "",
                })
              }
            />

            <input
              type="text"
              placeholder="Customer"
              value={orderForm.customer}
              onChange={(e) =>
                setOrderForm({ ...orderForm, customer: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Item Name"
              value={orderForm.item}
              onChange={(e) =>
                setOrderForm({ ...orderForm, item: e.target.value })
              }
            />

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={orderForm.qty}
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  qty: Number(e.target.value),
                })
              }
            />

            <input
              type="text"
              placeholder="Table"
              value={orderForm.table}
              onChange={(e) =>
                setOrderForm({ ...orderForm, table: e.target.value })
              }
            />

            <select
              value={orderForm.status}
              onChange={(e) =>
                setOrderForm({ ...orderForm, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Served</option>
              <option>Cancelled</option>
            </select>

            <div className="cb-modal-actions">
              <button className="save-btn" onClick={saveOrder}>
                {orderEditing ? "Save Changes" : "Create"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setOrderModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
