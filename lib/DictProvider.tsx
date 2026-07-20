"use client";

import { createContext, useContext } from "react";
import { ru, type Dict } from "@/content/ru";

const DictCtx = createContext<Dict>(ru);

export function DictProvider({
  dict,
  children,
}: {
  dict: Dict;
  children: React.ReactNode;
}) {
  return <DictCtx.Provider value={dict}>{children}</DictCtx.Provider>;
}

export function useDict(): Dict {
  return useContext(DictCtx);
}
