import { createContext, useState, useEffect, useContext } from "react";
import AxiosInstance from "@/components/AxiosInstance.tsx";

type User = {
  image_url: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  plan: string;
  balance: number;
  pending_sender_transactions: [];
  pending_received_transactions: [];
  currencies: [];
};

type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const defaultUser: User = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  plan: "",
  balance: 0,
  sent_transactions: [],
  received_transactions: [],
  currencies: [],
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    AxiosInstance.get("users/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
