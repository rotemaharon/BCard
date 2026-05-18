import React from "react";
import Card from "../components/Card";
import { useCards } from "../hooks/useCards";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { likeCard } from "../services/cardService";
import { toast } from "react-toastify";
import "../css/CardGrid.css";

const FavCardsPage: React.FC = () => {
  const { user } = useAuth();
  const { searchQuery } = useSearch();
  const { cards, loading, error, setCards } = useCards();

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5 text-danger">Error loading cards</div>
    );

  const favCards = cards.filter(
    (card) => user && card.likes.includes(user._id),
  );

  const filteredFavCards = favCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemoveFromFav = async (id: string) => {
    if (!user) return;
    try {
      await likeCard(id);
      setCards((prev) =>
        prev.map((card) =>
          card._id === id
            ? {
                ...card,
                likes: card.likes.filter((l) => l !== user._id),
              }
            : card,
        ),
      );
      toast.success("Card removed from favorites");
    } catch (err) {
      console.error(err);
      toast.error("Error removing card");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Favorite Cards</h1>
      <p className="page-subtitle">
        Here you can find all your favorite business cards
      </p>

      {filteredFavCards.length === 0 ? (
        <p>
          {favCards.length === 0
            ? "You haven't liked any cards yet."
            : `No favorites match "${searchQuery}"`}
        </p>
      ) : (
        <div className="cards-grid">
          {filteredFavCards.map((card) => (
            <Card key={card._id} card={card} onLike={handleRemoveFromFav} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavCardsPage;
