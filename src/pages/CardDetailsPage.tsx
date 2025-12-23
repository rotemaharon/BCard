import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardById } from "../services/cardService";
import type { CardType } from "../interfaces/CardType";
import { useTheme } from "../context/ThemeContext";
import "../css/CardDetails.css";

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
      <div className={`text-center mt-5 ${darkMode ? "text-white" : ""}`}>
        Loading details...
      </div>
    );
  if (!card)
    return (
      <div className={`text-center mt-5 ${darkMode ? "text-white" : ""}`}>
        Card not found
      </div>
    );

  const addressString = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    addressString
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const themeClass = darkMode ? "dark" : "light";

  return (
    <div className={`details-container ${themeClass}`}>
      <button onClick={() => navigate(-1)} className={`back-btn ${themeClass}`}>
        Back
      </button>

      <div className="details-img-container">
        <img
          src={card.image.url}
          alt={card.image.alt}
          className="details-img"
        />
      </div>

      <div className="details-header">
        <h1 className="details-title">{card.title}</h1>
        <h3 className={`details-subtitle ${themeClass}`}>{card.subtitle}</h3>
        <hr className={`details-divider ${themeClass}`} />

        <p className={`details-description ${themeClass}`}>
          {card.description}
        </p>

        <div className={`info-box ${themeClass}`}>
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
                className={`details-link ${themeClass}`}
              >
                {card.web}
              </a>
            </p>
          )}
          <p>
            <strong>📍 Address:</strong> {addressString}
          </p>

          <div className={`map-container ${themeClass}`}>
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
