import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  changeUserBusinessStatus,
} from "../services/apiService";
import type { UserType } from "../interfaces/UserType";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SandboxPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.isAdmin) {
      getUsers()
        .then(setUsers)
        .catch(() => toast.error("Failed to load users"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  if (loading) return <div className="text-center mt-5">Loading...</div>;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleStatus = async (id: string) => {
    try {
      await changeUserBusinessStatus(id);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isBusiness: !u.isBusiness } : u
        )
      );
      toast.success("Status changed");
    } catch {
      toast.error("Status change failed");
    }
  };

  const thStyle: React.CSSProperties = {
    padding: "12px 10px",
    position: "sticky",
    top: 0,
    background: "#212529",
    color: "white",
    zIndex: 2,
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 className="mb-2">CRM System</h1>
      <p className="text-muted mb-4">Total Users: {users.length}</p>

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "800px",
            borderCollapse: "collapse",
          }}
        >
          <colgroup>
            <col style={{ width: "60px" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "140px" }} />
          </colgroup>

          <thead>
            <tr style={{ backgroundColor: "#212529" }}>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr
                key={u._id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fff" : "#f8f9fa",
                  borderBottom: "1px solid #eee",
                  color: "#333",
                }}
              >
                <td style={{ padding: "8px 10px", textAlign: "center" }}>
                  <img
                    src={u.image.url}
                    alt="avatar"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </td>

                <td
                  style={{
                    padding: "8px 10px",
                    fontWeight: "500",
                    color: "#555",
                    whiteSpace: "nowrap",
                  }}
                >
                  {u.name.first} {u.name.last}
                </td>

                <td
                  style={{
                    padding: "8px 10px",
                    color: "#555",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={u.email}
                >
                  {u.email}
                </td>

                <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
                  {u.isAdmin ? (
                    <span style={{ fontWeight: "bold", color: "#6f42c1" }}>
                      Admin
                    </span>
                  ) : (
                    "User"
                  )}
                </td>

                <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
                  <span
                    style={{
                      backgroundColor: u.isBusiness ? "#d4edda" : "#e2e3e5",
                      color: u.isBusiness ? "#155724" : "#383d41",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      display: "inline-block",
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {u.isBusiness ? "Business" : "Regular"}
                  </span>
                </td>

                <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
                  {!u.isAdmin && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleStatus(u._id)}
                        style={{
                          padding: "4px 8px",
                          cursor: "pointer",
                          background: "#fff3cd",
                          color: "#856404",
                          border: "1px solid #ffeeba",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        Change
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        style={{
                          padding: "4px 8px",
                          cursor: "pointer",
                          background: "#f8d7da",
                          color: "#721c24",
                          border: "1px solid #f5c6cb",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SandboxPage;
