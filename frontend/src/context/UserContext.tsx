import React, { createContext, useState, type ReactNode } from 'react';

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsernameState] = useState<string>(() => {
    return localStorage.getItem('codeleap_username') || '';
  });

  const setUsername = (name: string) => {
    localStorage.setItem('codeleap_username', name);
    setUsernameState(name);
  };

  const logout = () => {
    localStorage.removeItem('codeleap_username');
    setUsernameState('');
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};

