import React from "react";
import Card from "./Card";
import { useCards } from "../hooks/useCards";
import { useSearch } from "../context/SearchContext";
import { likeCard } from "../services/cardService";

const HomePage: React.FC = () => {
  const { cards, loading, error, refreshCards } = useCards();
  const { searchQuery } = useSearch();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

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
    <div className="container" style={{ padding: "20px" }}>
      <h1>Cards Page</h1>
      <p className="text-secondary mb-4">Here you can find business cards</p>

      {filteredCards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredCards.map((card) => (
            <Card key={card._id} card={card} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
