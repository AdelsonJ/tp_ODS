'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    nome: string;
    data_nasc: string;
    email: string;
    username: string;
    senha: string;
    tipo: string;
    idade: number;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provedor do contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro do UserProvider');
  }
  return context;
};
