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
        backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
        borderBottom: "1px solid #f1f1f1",
        color: "#333",
        transition: "background-color 0.2s",
      }}
    >
      <td style={{ padding: "12px 10px", textAlign: "center" }}>
        <img
          src={user.image.url}
          alt="avatar"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #fff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            display: "block",
            margin: "0 auto",
          }}
        />
      </td>
      <td
        style={{
          padding: "12px 10px",
          fontWeight: "600",
          color: "#444",
          whiteSpace: "nowrap",
        }}
      >
        {user.name.first} {user.name.last}
      </td>
      <td
        style={{
          padding: "12px 10px",
          color: "#666",
          whiteSpace: "nowrap",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={user.email}
      >
        {user.email}
      </td>
      <td style={{ padding: "12px 10px", whiteSpace: "nowrap" }}>
        {user.isAdmin ? (
          <span style={{ fontWeight: "bold", color: "#6f42c1" }}>Admin</span>
        ) : (
          "User"
        )}
      </td>
      <td style={{ padding: "12px 10px", whiteSpace: "nowrap" }}>
        <span
          style={{
            backgroundColor: user.isBusiness ? "#e8f5e9" : "#f1f3f5",
            color: user.isBusiness ? "#2e7d32" : "#495057",
            padding: "5px 12px",
            borderRadius: "50px",
            fontSize: "0.75rem",
            fontWeight: "700",
            display: "inline-block",
            minWidth: "80px",
            textAlign: "center",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {user.isBusiness ? "Business" : "Regular"}
        </span>
      </td>
      <td style={{ padding: "12px 10px", whiteSpace: "nowrap" }}>
        {!user.isAdmin && (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleStatus(user._id)}
              style={{
                padding: "6px 14px",
                cursor: "pointer",
                background: "linear-gradient(135deg, #ffecb3 0%, #ffe082 100%)",
                color: "#8d6e63",
                border: "none",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: "600",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.1s",
              }}
              title="Change Status"
            >
              Change
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              style={{
                padding: "6px 14px",
                cursor: "pointer",
                background: "linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%)",
                color: "#b71c1c",
                border: "none",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: "600",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.1s",
              }}
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
