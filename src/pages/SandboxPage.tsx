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
import SandboxRow from "../components/SandboxRow";
import { useTheme } from "../context/ThemeContext"; 

const SandboxPage: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme(); 
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.name.first} ${u.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const thStyle: React.CSSProperties = {
    padding: "12px 10px",
    position: "sticky",
    top: 0,
    background: darkMode ? "#333" : "#212529",
    color: "white",
    zIndex: 2,
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: darkMode ? "#fff" : "#000", 
      }}
    >
      <h1 className="mb-2">CRM System</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <p
          className="m-0"
          style={{
            fontWeight: "500",
            color: darkMode ? "#ccc" : "#6c757d",
          }}
        >
          Total Users: {users.length}
        </p>
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            maxWidth: isMobile ? "160px" : "300px",
            width: "100%",
            padding: "10px 20px",
            borderRadius: "30px",
            border: darkMode ? "1px solid #555" : "1px solid #ddd",
            backgroundColor: darkMode ? "#333" : "#fff", 
            color: darkMode ? "#fff" : "#000", 
            outline: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          backgroundColor: darkMode ? "#222" : "white", 
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          border: darkMode ? "1px solid #444" : "1px solid #eee",
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
            <col style={{ width: "160px" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, i) => (
                <SandboxRow
                  key={u._id}
                  user={u}
                  index={i}
                  handleStatus={handleStatus}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4"
                  style={{ color: darkMode ? "#ccc" : "#6c757d" }}
                >
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SandboxPage;
