import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/cardService";
import type { CardType } from "../interfaces/CardType";
import { useTheme } from "../context/ThemeContext";

const CardDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCardById(id)
      .then((data) => setCard(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div
        className="text-center mt-5"
        style={{ color: darkMode ? "white" : "black" }}
      >
        Loading details...
      </div>
    );
  if (!card)
    return (
      <div
        className="text-center mt-5"
        style={{ color: darkMode ? "white" : "black" }}
      >
        Card not found
      </div>
    );

  const addressString = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    addressString
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        background: darkMode ? "#2c3034" : "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        color: darkMode ? "#fff" : "#000",
        border: darkMode ? "1px solid #444" : "none",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          background: darkMode ? "#444" : "none",
          color: darkMode ? "#fff" : "#000",
          border: darkMode ? "1px solid #666" : "1px solid #ccc",
          padding: "5px 15px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Back
      </button>

      <div
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <img
          src={card.image.url}
          alt={card.image.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            color: darkMode ? "#fff" : "#333",
            marginBottom: "10px",
          }}
        >
          {card.title}
        </h1>
        <h3
          style={{
            color: darkMode ? "#ccc" : "#666",
            fontWeight: "normal",
            marginBottom: "20px",
          }}
        >
          {card.subtitle}
        </h3>
        <hr
          style={{
            border: "0",
            borderTop: darkMode ? "1px solid #555" : "1px solid #eee",
            margin: "20px 0",
          }}
        />

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            margin: "20px 0",
            textAlign: "left",
            color: darkMode ? "#eee" : "black",
          }}
        >
          {card.description}
        </p>

        <div
          style={{
            background: darkMode ? "#212529" : "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left",
            color: darkMode ? "#fff" : "black",
            border: darkMode ? "1px solid #444" : "none",
          }}
        >
          <h4 style={{ marginBottom: "15px" }}>Contact Details:</h4>
          <p>
            <strong>📞 Phone:</strong> {card.phone}
          </p>
          <p>
            <strong>📧 Email:</strong> {card.email}
          </p>
          {card.web && (
            <p>
              <strong>🌐 Website:</strong>{" "}
              <a
                href={card.web}
                target="_blank"
                rel="noreferrer"
                style={{ color: darkMode ? "#90caf9" : "#2196F3" }}
              >
                {card.web}
              </a>
            </p>
          )}
          <p>
            <strong>📍 Address:</strong> {addressString}
          </p>

          <div
            style={{
              marginTop: "20px",
              height: "300px",
              width: "100%",
              borderRadius: "8px",
              overflow: "hidden",
              border: darkMode ? "1px solid #555" : "1px solid #ddd",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={mapUrl}
              title="Business Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
