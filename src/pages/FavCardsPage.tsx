import React from "react";
import Card from "../components/Card";
import { useCards } from "../hooks/useCards";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { likeCard } from "../services/cardService";
import { toast } from "react-toastify";

const FavCardsPage: React.FC = () => {
  const { user } = useAuth();
  const { searchQuery } = useSearch(); 
  const { cards, loading, error, refreshCards } = useCards();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-danger text-center mt-5">Error loading cards</div>
    );

  const favCards = cards.filter(
    (card) => user && card.likes.includes(user._id)
  );

  const filteredFavCards = favCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFromFav = async (id: string) => {
    try {
      await likeCard(id);
      await refreshCards();
      toast.success("Card removed from favorites");
    } catch (err) {
      console.error(err);
      toast.error("Error removing card");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Favorite Cards</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Here you can find all your favorite business cards
      </p>

      {filteredFavCards.length === 0 ? (
        <p>
          {favCards.length === 0
            ? "You haven't liked any cards yet."
            : `No favorites match "${searchQuery}"`}
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredFavCards.map((card) => (
            <Card key={card._id} card={card} onLike={handleRemoveFromFav} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavCardsPage;
