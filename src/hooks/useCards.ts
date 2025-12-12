import { useState, useEffect, useCallback } from "react";
import type { CardType } from "../interfaces/CardType";
import { getCards, getMyCards } from "../services/cardService";

export const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCards();
      setCards(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error fetching cards");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCards();
  }, [refreshCards]);

  return { cards, loading, error, setCards, refreshCards };
};
export const useMyCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCards = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyCards();
      setCards(data);
    } catch (err) {
      console.error(err); 
      setError("Error fetching my cards");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCards();
  }, [refreshCards]);

  return { cards, loading, error, setCards, refreshCards };
};
