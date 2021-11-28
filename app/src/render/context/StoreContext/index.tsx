import React, { createContext, useContext } from "react";
import { useRecommendations } from "./hooks/useRecommendations";

function useStore() {
  const recommendations = useRecommendations();

  return {
    recommendations,
  };
}

const Context = createContext<ReturnType<typeof useStore> | null>(null);

interface StoreContextProps {
  children: React.ReactNode;
}

export default function StoreContext({ children }: StoreContextProps) {
  const value = useStore();

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStoreContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useStoreContext without StoreContext");
  }
  return context;
}
