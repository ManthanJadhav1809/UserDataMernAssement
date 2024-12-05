import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./CSS/AdminProfile.css"
export default function AdminProfilePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("firstName");
  const [order, setOrder] = useState("asc");

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/api/admin/users`, {
        params: { page, limit, search, sort, order },
      });
      setUsers(res.data.users);
      setTotalUsers(res.data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, sort, order]);

  const handleLogout = () => {
    navigate("/Adminlogin");
  };

  
  const handleBlockUnblock = async (userId, isBlocked) => {
    try {
      await api.patch(`/api/admin/users/${userId}/toggle-block`, { blocked: !isBlocked });
      fetchUsers();
    } catch (error) {
      console.error("Error blocking/unblocking user:", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    }
  };

  const totalPages = Math.ceil(totalUsers / limit);

  console.log(users)
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">Admin Panel</div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div>
        <h2>User Management</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>#</th>
              <th
                onClick={() => {
                  setSort("firstName");
                  setOrder(order === "asc" ? "desc" : "asc");
                }}
              >
                Name {sort === "firstName" ? (order === "asc" ? "▲" : "▼") : ""}
              </th>
              <th>Email</th>
              <th>Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{`${user.firstName} ${user.lastName} ${user._id}`}</td>
                <td>{user.email}</td>
                <td>{user.blocked ? "Blocked" : "Active"}</td>
                <td>
                  <button
                    onClick={() => handleBlockUnblock(user._id, user.blocked)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
