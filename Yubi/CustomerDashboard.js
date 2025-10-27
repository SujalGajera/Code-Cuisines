import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const reservations = [
    { date: "2025-11-01", time: "6:00 PM", table: 3, status: "Confirmed" },
    { date: "2025-11-05", time: "8:00 PM", table: 5, status: "Pending" },
  ];

  const menu = [
    { name: "Grilled Chicken", price: 18.5, image: "/images/chicken.jpg" },
    { name: "Pasta Alfredo", price: 15.0, image: "/images/pasta.jpg" },
    { name: "Tiramisu", price: 9.0, image: "/images/tiramisu.jpg" },
  ];

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-black px-4">
        <h3 className="text-warning fw-bold">Code & Cuisine</h3>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link text-light" href="#menu">Menu</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#reservations">Reservations</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#profile">Profile</a>
          </li>
          <li className="nav-item">
            <button className="btn btn-warning btn-sm ms-3">Logout</button>
          </li>
        </ul>
      </nav>

      <div className="container mt-5">
        <h2 className="text-warning fw-bold">Welcome, Yubraj 👋</h2>
        <p className="text-secondary">Manage your dining experience with ease.</p>

        {/* Menu Section */}
        <section id="menu" className="mt-5">
          <h3 className="text-warning mb-3">Our Menu</h3>
          <div className="row">
            {menu.map((item, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card bg-black text-light border-0 shadow-sm">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="text-warning">{item.name}</h5>
                    <p>${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reservations Section */}
        <section id="reservations" className="mt-5">
          <h3 className="text-warning mb-3">My Reservations</h3>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Table</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.time}</td>
                  <td>{r.table}</td>
                  <td>
                    <span className="badge bg-warning text-dark">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Profile Section */}
        <section id="profile" className="mt-5">
          <h3 className="text-warning mb-3">My Profile</h3>
          <div className="card bg-black text-light p-3 border-0 shadow-sm">
            <p><strong>Name:</strong> Yubraj Thapa</p>
            <p><strong>Email:</strong> yubraj@codecuisine.com</p>
            <button className="btn btn-warning btn-sm w-25">Edit Profile</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CustomerDashboard;
