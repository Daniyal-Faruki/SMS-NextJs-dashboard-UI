// context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSplash from "@/components/LoadingSplash";

type UserContextType = {
  user: any;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      setCurrentUser(user);
    }
  }, [isAuthenticated, isLoading, user]);

  //   // Show global loading until user is loaded
  //   if (isLoading || (isAuthenticated && !currentUser) || true) {
  //     return <LoadingSplash />;
  //   }

  const showLoading = isLoading || (isAuthenticated && !currentUser);

  return (
    <UserContext.Provider value={{ user: currentUser, isLoading }}>
      {showLoading ? <LoadingSplash /> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
