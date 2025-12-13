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

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 className="mb-2">CRM System</h1>
      <p className="text-muted mb-4">Total Users: {users.length}</p>

      <div
        style={{
          overflowX: "auto",
          maxHeight: "80vh",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0",
            fontSize: "0.9rem",
            minWidth: "800px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#212529",
                color: "white",
                textAlign: "left",
              }}
            >
              {["", "Name", "Email", "Role", "Status", "Actions"].map(
                (head, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "12px",
                      position: "sticky",
                      top: 0,
                      background: "#212529",
                      zIndex: 2,
                    }}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u._id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fff" : "#f8f9fa",
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "8px 12px" }}>
                  <img
                    src={u.image.url}
                    alt={`Profile picture for ${u.name.first} ${u.name.last}`}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                </td>
                <td
                  style={{
                    padding: "8px",
                    maxWidth: "120px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  {u.name.first} {u.name.last}
                </td>
                <td
                  style={{
                    padding: "8px",
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#555",
                  }}
                >
                  {u.email}
                </td>
                <td style={{ padding: "8px 12px" }}>
                  {u.isAdmin ? (
                    <span style={{ fontWeight: "bold", color: "#6f42c1" }}>
                      Admin
                    </span>
                  ) : (
                    "User"
                  )}
                </td>
                <td style={{ padding: "8px 12px" }}>
                  <span
                    style={{
                      backgroundColor: u.isBusiness ? "#d4edda" : "#e2e3e5",
                      color: u.isBusiness ? "#155724" : "#383d41",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {u.isBusiness ? "Business" : "Regular"}
                  </span>
                </td>
                <td style={{ padding: "8px 12px" }}>
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
