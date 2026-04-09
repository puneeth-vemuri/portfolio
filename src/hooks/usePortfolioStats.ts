import { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

const STATS_DOC = "portfolio/stats";

interface PortfolioStats {
  likes: number;
  views: number;
}

export function usePortfolioStats() {
  const [stats, setStats] = useState<PortfolioStats>({ likes: 0, views: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user already liked (localStorage)
  useEffect(() => {
    const liked = localStorage.getItem("portfolio_liked");
    if (liked === "true") setHasLiked(true);
  }, []);

  // Fetch stats + increment view count on mount
  useEffect(() => {
    const fetchAndTrack = async () => {
      try {
        const ref = doc(db, "portfolio", "stats");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() as PortfolioStats;
          setStats(data);
          // Increment view
          await updateDoc(ref, { views: increment(1) });
          setStats((prev) => ({ ...prev, views: prev.views + 1 }));
        } else {
          // Initialize doc if not present
          await setDoc(ref, { likes: 0, views: 1 });
          setStats({ likes: 0, views: 1 });
        }
      } catch (err) {
        console.warn("Firebase stats unavailable:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndTrack();
  }, []);

  const toggleLike = useCallback(async () => {
    try {
      const ref = doc(db, "portfolio", "stats");
      if (hasLiked) {
        await updateDoc(ref, { likes: increment(-1) });
        setStats((prev) => ({ ...prev, likes: Math.max(0, prev.likes - 1) }));
        setHasLiked(false);
        localStorage.removeItem("portfolio_liked");
      } else {
        await updateDoc(ref, { likes: increment(1) });
        setStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
        setHasLiked(true);
        localStorage.setItem("portfolio_liked", "true");
      }
    } catch (err) {
      console.warn("Could not update like:", err);
    }
  }, [hasLiked]);

  return { stats, hasLiked, toggleLike, loading };
}
