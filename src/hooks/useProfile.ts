"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseReady } from "@/lib/supabase";

export interface Profile {
  id: string;
  name: string;
  phone: string;
  wishlist: string[];
}

const LOCAL_KEY = "souk_profile_id";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem(LOCAL_KEY);
    if (savedId && isSupabaseReady && supabase) {
      supabase.from("profiles").select("*").eq("id", savedId).single().then(({ data }) => {
        if (data) setProfile(data as Profile);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const createProfile = async (name: string, phone: string) => {
    if (isSupabaseReady && supabase) {
      const { data } = await supabase.from("profiles").insert({ name, phone, wishlist: [], wallet_points: 0 }).select().single();
      if (data) {
        localStorage.setItem(LOCAL_KEY, data.id);
        setProfile(data as Profile);
        setShowWelcome(false);
        return;
      }
    }
    // fallback local
    const local: Profile = { id: `local-${Date.now()}`, name, phone, wishlist: [] };
    localStorage.setItem(LOCAL_KEY, local.id);
    setProfile(local);
    setShowWelcome(false);
  };

  const toggleWishlist = async (productId: string) => {
    if (!profile) { setShowWelcome(true); return; } // ouvre la mini popup au clic ❤️
    const inList = profile.wishlist.includes(productId);
    const updated = inList ? profile.wishlist.filter(id => id !== productId) : [...profile.wishlist, productId];
    setProfile({ ...profile, wishlist: updated });
    if (isSupabaseReady && supabase) {
      await supabase.from("profiles").update({ wishlist: updated }).eq("id", profile.id);
    }
  };

  return { profile, loading, showWelcome, setShowWelcome, createProfile, toggleWishlist };
}
