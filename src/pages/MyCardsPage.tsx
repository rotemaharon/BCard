import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Card from "../components/Card";
import { useMyCards } from "../hooks/useCards";
import { deleteCard, likeCard } from "../services/cardService";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { toast } from "react-toastify";

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
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>My Cards</h1>
          <p style={{ color: "#666" }}>
            Welcome back, {user?.name?.first || "Business User"}
          </p>
        </div>

        <button
          onClick={() => navigate("/create-card")}
          style={{
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          }}
          title="Create New Card"
        >
          <FaPlus />
        </button>
      </div>

      {!filteredCards || filteredCards.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
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
