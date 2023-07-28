// ModalContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface IModalContext {
  modal: Record<string, boolean>;
  setModal: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

interface IModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modal, setModal] = useState<Record<string, boolean>>({});

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
