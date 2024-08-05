import React, { createContext, useContext, useEffect, useState } from "react";

type Font =
  | "Inter"
  | "Montserrat"
  | "Roboto"
  | "Poppins"
  | "Lato"
  | "Open Sans"
  | "Noto Sans"
  | "Satoshi";

type FontProviderProps = {
  children: React.ReactNode;
  defaultFont?: Font;
  storageKey?: string;
};

type FontProviderState = {
  font: Font;
  setFont: (font: Font) => void;
};

const initialState: FontProviderState = {
  font: "Inter",
  setFont: () => null,
};

const FontProviderContext = createContext<FontProviderState>(initialState);

export function FontProvider({
  children,
  defaultFont = "Inter",
  storageKey = "app-font",
  ...props
}: FontProviderProps) {
  const [font, setFont] = useState<Font>(
    () => (localStorage.getItem(storageKey) as Font) || defaultFont
  );

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  const value = {
    font,
    setFont: (font: Font) => {
      localStorage.setItem(storageKey, font);
      setFont(font);
    },
  };

  return (
    <FontProviderContext.Provider {...props} value={value}>
      {children}
    </FontProviderContext.Provider>
  );
}

export const useFont = () => {
  const context = useContext(FontProviderContext);

  if (context === undefined)
    throw new Error("useFont must be used within a FontProvider");

  return context;
};
