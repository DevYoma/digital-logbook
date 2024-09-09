import { createContext, useState } from "react";

type ChildProp = {
    children: React.ReactNode;
}

type CharacterCountContextType = {
  characterCount: number;
  setCharacterCount: (count: number) => void;
};

export const CharacterCountContext = createContext<CharacterCountContextType>({
    characterCount: 0,
    setCharacterCount: () => {}
})

export const CharacterCountProvider = ({ children }: ChildProp) => {

  const [characterCount, setCharacterCount] = useState(0);

  return (
    <CharacterCountContext.Provider value={{ characterCount, setCharacterCount }}>
      {children}
    </CharacterCountContext.Provider>
  )
}