import React, { createContext, useContext, useState } from "react";

/* ---------- Types ---------- */

export type Language = "en" | "km" | "zh";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

/* ---------- Context ---------- */

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

/* ---------- Provider ---------- */

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Simple translation function (you can expand later)
  const t = (key: string) => key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/* ---------- Hook ---------- */

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
