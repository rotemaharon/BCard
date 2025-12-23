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
import "../css/SandboxLayout.css";
import "../css/SandboxTable.css";

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

  const themeClass = darkMode ? "dark" : "light";

  return (
    <div className={`sandbox-container ${themeClass}`}>
      <h1 className="sandbox-header">CRM System</h1>
      <div className="sandbox-controls">
        <p className={`user-count ${themeClass}`}>
          Total Users: {users.length}
        </p>
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`sandbox-search ${themeClass}`}
          style={{ maxWidth: isMobile ? "160px" : "300px" }}
        />
      </div>
      <div className={`table-wrapper ${themeClass}`}>
        <table className="sandbox-table">
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
              <th className={`sandbox-th ${themeClass}`}>Image</th>
              <th className={`sandbox-th ${themeClass}`}>Name</th>
              <th className={`sandbox-th ${themeClass}`}>Email</th>
              <th className={`sandbox-th ${themeClass}`}>Role</th>
              <th className={`sandbox-th ${themeClass}`}>Status</th>
              <th className={`sandbox-th ${themeClass}`}>Actions</th>
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
                  className={`text-center p-4 ${themeClass}`}
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
