import React from "react";
import Card from "./Card";
import { useCards } from "../hooks/useCards";
import { useSearch } from "../context/SearchContext";
import { likeCard } from "../services/cardService";
import "../css/CardGrid.css";

const HomePage: React.FC = () => {
  const { cards, loading, error, refreshCards } = useCards();
  const { searchQuery } = useSearch();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  const handleLike = async (id: string) => {
    try {
      await likeCard(id);
      await refreshCards();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.bizNumber.toString().includes(searchQuery)
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Cards Page</h1>
      <p className="page-subtitle">Here you can find business cards</p>

      {filteredCards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <div className="cards-grid">
          {filteredCards.map((card) => (
            <Card key={card._id} card={card} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
