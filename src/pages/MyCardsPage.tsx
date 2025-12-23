import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Card from "../components/Card";
import { useMyCards } from "../hooks/useCards";
import { deleteCard, likeCard } from "../services/cardService";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";
import "../css/CardGrid.css";

const MyCardsPage: React.FC = () => {
  const { user } = useAuth();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const { cards, loading, error, setCards, refreshCards } = useMyCards();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(id);
        setCards(cards.filter((card) => card._id !== id));
        toast.success("Card deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Error deleting card");
      }
    }
  };

  const handleLike = async (id: string) => {
    try {
      await likeCard(id);
      await refreshCards();
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return <div className="text-center mt-5">Loading your cards...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header-area">
        <div>
          <h1 className="page-title">My Cards</h1>
          <p className="page-subtitle">
            Welcome back, {user?.name?.first || "Business User"}
          </p>
        </div>

        <button
          onClick={() => navigate("/create-card")}
          className="add-card-btn"
          title="Create New Card"
        >
          <FaPlus />
        </button>
      </div>

      {!filteredCards || filteredCards.length === 0 ? (
        <div className="no-cards-msg">
          {cards.length === 0 ? (
            <>
              <h3>You haven't created any cards yet.</h3>
              <p>Click the + button to create your first business card!</p>
            </>
          ) : (
            <p>No cards match your search "{searchQuery}"</p>
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {filteredCards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onDelete={handleDelete}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCardsPage;
