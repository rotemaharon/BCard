import React from "react";
import { type CardType } from "../interfaces/CardType";
import { FaPhone, FaHeart, FaTrash, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface CardProps {
  card: CardType;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onDelete, onLike }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isLiked = user && card.likes.includes(user._id);
  const isOwner = user && (user._id === card.user_id || user.isAdmin);

  const handleImageClick = () => {
    navigate(`/card/${card._id}`);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={card.image.url}
        alt={card.image.alt}
        onClick={handleImageClick}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      <div style={{ padding: "15px", flex: 1 }}>
        <h3>{card.title}</h3>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>{card.subtitle}</p>
        <hr
          style={{ margin: "10px 0", border: "0", borderTop: "1px solid #eee" }}
        />
        <p>
          <strong>Phone:</strong> {card.phone}
        </p>
        <p>
          <strong>Address:</strong> {card.address.street}{" "}
          {card.address.houseNumber}, {card.address.city}
        </p>
        <p>
          <strong>Card Number:</strong> {card.bizNumber}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {user && onLike && (
              <button
                onClick={() => onLike(card._id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: isLiked ? "red" : "gray",
                  fontSize: "1.2rem",
                }}
              >
                <FaHeart />
              </button>
            )}
            <a
              href={`tel:${card.phone}`}
              style={{ color: "black", fontSize: "1.2rem" }}
            >
              <FaPhone />
            </a>
          </div>

          {isOwner && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => navigate(`/edit-card/${card._id}`)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                <FaPen />
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(card._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "gray",
                    fontSize: "1.2rem",
                  }}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
