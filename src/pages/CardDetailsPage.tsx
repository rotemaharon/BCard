import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/cardService";
import type { CardType } from "../interfaces/CardType";

const CardDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    return <div className="text-center mt-5">Loading details...</div>;
  if (!card) return <div className="text-center mt-5">Card not found</div>;

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
        background: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          background: "none",
          border: "1px solid #ccc",
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
        <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "10px" }}>
          {card.title}
        </h1>
        <h3
          style={{ color: "#666", fontWeight: "normal", marginBottom: "20px" }}
        >
          {card.subtitle}
        </h3>
        <hr
          style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }}
        />

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            margin: "20px 0",
            textAlign: "left",
          }}
        >
          {card.description}
        </p>

        <div
          style={{
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "left",
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
                style={{ color: "#2196F3" }}
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
              border: "1px solid #ddd",
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
