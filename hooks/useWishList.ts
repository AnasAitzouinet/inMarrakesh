import { useEffect, useState, useCallback } from 'react';
import { Activities, Trips } from '@prisma/client';
import { useRouter } from 'next/navigation';

export function useWishList() {
  const [wishList, setWishList] = useState<(Activities | Trips)[]>([]);
    const router = useRouter();

  // Load the wishlist from localStorage on mount.
  useEffect(() => {
    const storedWishList = window.localStorage.getItem('wishList');
    if (storedWishList) {
      try {
        setWishList(JSON.parse(storedWishList));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  const addToWishList = useCallback((item: Activities | Trips) => {
    console.log("added to wishlist");
    setWishList((prev) => {
      const updatedWishList = [...prev, item];
      window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
      return updatedWishList;
    });
    router.refresh();
  }, []);

  const removeFromWishList = useCallback((id: string) => {
    setWishList((prev) => {
      const updatedWishList = prev.filter(item => item.id.toString() !== id);
      window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
      return updatedWishList;
    });
    router.refresh();

  }, []);

  const isInWishList = useCallback((id: string) => {
    return wishList.some(item => item.id.toString() === id);
  }, [wishList]);

  return {
    wishList,
    addToWishList,
    removeFromWishList,
    isInWishList
  };
}
