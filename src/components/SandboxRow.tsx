import React from "react";
import type { UserType } from "../interfaces/UserType";
import { useTheme } from "../context/ThemeContext";
import "../css/SandboxTable.css";

interface SandboxRowProps {
  user: UserType;
  index: number;
  handleStatus: (id: string) => void;
  handleDelete: (id: string) => void;
}

const SandboxRow: React.FC<SandboxRowProps> = ({
  user,
  index,
  handleStatus,
  handleDelete,
}) => {
  const { darkMode } = useTheme();
  const themeClass = darkMode ? "dark" : "light";
  const rowStripe = index % 2 === 0 ? "even" : "odd";

  return (
    <tr className={`sandbox-row ${rowStripe} ${themeClass}`}>
      <td className="sandbox-td center">
        <img
          src={user.image.url}
          alt="avatar"
          className={`user-avatar ${themeClass}`}
        />
      </td>
      <td className={`sandbox-td text-name ${themeClass}`}>
        {user.name.first} {user.name.last}
      </td>
      <td className={`sandbox-td text-email ${themeClass}`} title={user.email}>
        {user.email}
      </td>
      <td className="sandbox-td">
        {user.isAdmin ? <span className="admin-badge">Admin</span> : "User"}
      </td>
      <td className="sandbox-td">
        <span
          className={`status-badge ${
            user.isBusiness ? "business" : "regular"
          } ${themeClass}`}
        >
          {user.isBusiness ? "Business" : "Regular"}
        </span>
      </td>
      <td className="sandbox-td">
        {!user.isAdmin && (
          <div className="action-btn-group">
            <button
              onClick={() => handleStatus(user._id)}
              className="sandbox-btn btn-change"
              title="Change Status"
            >
              Change
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="sandbox-btn btn-delete"
              title="Delete User"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SandboxRow;
