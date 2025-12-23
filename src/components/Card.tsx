import React from "react";
import { type CardType } from "../interfaces/CardType";
import { FaPhone, FaHeart, FaTrash, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/CardItem.css";

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
    <div className="card-container">
      <img
        src={card.image.url}
        alt={card.image.alt}
        onClick={handleImageClick}
        className="card-img"
      />

      <div className="card-body">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-subtitle">{card.subtitle}</p>
        <hr className="card-divider" />
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

        <div className="card-actions">
          <div className="card-actions-left">
            {user && onLike && (
              <button
                onClick={() => onLike(card._id)}
                className="action-btn"
                style={{ color: isLiked ? "red" : "gray" }}
              >
                <FaHeart />
              </button>
            )}
            <a href={`tel:${card.phone}`} className="action-btn phone-link">
              <FaPhone />
            </a>
          </div>

          {isOwner && (
            <div className="card-actions-right">
              <button
                onClick={() => navigate(`/edit-card/${card._id}`)}
                className="action-btn"
              >
                <FaPen />
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(card._id)}
                  className="action-btn delete"
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
