import { createContext, FC, useState } from "react";

interface IIsPost {
  isPost?: boolean;
  setIsPost?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsPostContext = createContext<IIsPost>({});

export const IsPostProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isPost, setIsPost] = useState<boolean>(false);
  return (
    <IsPostContext.Provider value={{ isPost, setIsPost }}>
      {children}
    </IsPostContext.Provider>
  );
};
