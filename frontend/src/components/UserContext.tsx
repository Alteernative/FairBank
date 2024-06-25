import { createContext, useState, useEffect, useContext } from "react";
import AxiosInstance from "@/components/AxiosInstance.tsx";

// TODO: Change first_name -> firstname & last_name -> lastname (SignUp.tsx, Backend(user/ -> views, serializers, ?))
type User = {
  // firstname: string;
  // lastname: string;
  first_name: string;
  last_name: string;
  email: string;
  plan: string;
  balance: number;
  id: number;
};

type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

// Prevents have to set the type to either `user: User | null` in UserContextProps
// TODO: Change first_name -> firstname & last_name -> lastname (SignUp.tsx, Backend(user/ -> views, serializers, ?))
const defaultUser: User = {
  // firstname: "Loading",
  // lastname: "User",
  first_name: "Loading",
  last_name: "User",
  email: "",
  // plan: "",
  plan: "Unknown",
  balance: 0,
  id:0,
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    AxiosInstance.get("users/")
      .then((res) => {
        // DEBUG:
        console.log("Fetched user data:", res.data);

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
