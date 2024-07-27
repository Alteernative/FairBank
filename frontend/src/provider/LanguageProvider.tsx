import { createContext, ReactNode, useContext, useState } from "react";
import i18n from "@/utils/i8n";

type code = "fr" | "en";

type LanguageProviderState = {
  language: string;
  setLanguage: (code: code) => void;
};

const LanguageProviderContext = createContext<
  LanguageProviderState | undefined
>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (code: string) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    // i18n.changeLanguage(language);
  };

  return (
    <LanguageProviderContext.Provider
      value={{ language, setLanguage: changeLanguage }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
