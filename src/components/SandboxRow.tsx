import React from "react";
import type { UserType } from "../interfaces/UserType";

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
  return (
    <tr
      style={{
        backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa",
        borderBottom: "1px solid #eee",
        color: "#333",
      }}
    >
      <td style={{ padding: "8px 10px", textAlign: "center" }}>
        <img
          src={user.image.url}
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
        {user.name.first} {user.name.last}
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
        title={user.email}
      >
        {user.email}
      </td>
      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
        {user.isAdmin ? (
          <span style={{ fontWeight: "bold", color: "#6f42c1" }}>Admin</span>
        ) : (
          "User"
        )}
      </td>
      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
        <span
          style={{
            backgroundColor: user.isBusiness ? "#d4edda" : "#e2e3e5",
            color: user.isBusiness ? "#155724" : "#383d41",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "600",
            display: "inline-block",
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          {user.isBusiness ? "Business" : "Regular"}
        </span>
      </td>
      <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
        {!user.isAdmin && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleStatus(user._id)}
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
              onClick={() => handleDelete(user._id)}
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
  );
};

export default SandboxRow;
