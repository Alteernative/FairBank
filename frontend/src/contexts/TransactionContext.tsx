import React, { createContext, useState, useEffect, useContext } from "react";
import AxiosInstance from "@/components/AxiosInstance";

type Transaction = {
    id: number;
    amount: number;
    date: string;
    receiver_id: number;
    sender_id: number;
};

type TransactionContextProps = {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

const defaultTransactions: Transaction[] = [];

const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

export const TransactionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);

    useEffect(() => {
        AxiosInstance.get("transactions/")
            .then((res) => {
                setTransactions(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactionContext = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error("useTransactionContext must be used within a TransactionContextProvider");
    }
    return context;
};
