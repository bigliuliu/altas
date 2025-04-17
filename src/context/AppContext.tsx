"use client"
import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

type AppProviderProps = React.PropsWithChildren<{}>;

export type GlobalType = {
  isCollapseNavMenu: boolean;
  setCollapseNavMenu: (c: boolean) => void;
  user: {
    idNumber: string;
    email: string;
    identification: File | null;
    phoneNumber: string;
    fullName: string;
    status: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      idNumber: string;
      email: string;
      identification: File | null;
      phoneNumber: string;
      fullName: string;
      status: string;
    }>
  >;
};

export const AppContext = createContext<GlobalType>({
  isCollapseNavMenu: true,
  setCollapseNavMenu: () => {},
  user: {
    idNumber: "",
    email: "",
    identification: null,
    phoneNumber: "",
    fullName: "",
    status: ""
  },
  setUser: () => {},
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isCollapseNavMenu, setCollapseNavMenu] = useState<boolean>(true);
  const [user, setUser] = useState<{
    idNumber: string;
    email: string;
    identification: File | null;
    phoneNumber: string;
    fullName: string;
    status: string;
  }>({
    idNumber: "",
    email: "",
    identification: null,
    phoneNumber: "",
    fullName: "",
    status:""
  });

  const value: GlobalType = {
    isCollapseNavMenu,
    setCollapseNavMenu,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
