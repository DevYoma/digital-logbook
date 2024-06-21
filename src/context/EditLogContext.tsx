import { createContext, useState } from "react";
import { ExistingEntry } from "../types/appTypes";

type ChildProp = {
    children: React.ReactNode;
}

type EditLogContextType = {
    logData: ExistingEntry | null;
    setLogData: (logData: ExistingEntry | null) => void;
    openEditModal: boolean;
    setOpenEditModal: (openEditModal: boolean) => void;
}

export const EditLogContext = createContext<EditLogContextType>({
    logData: null,
    setLogData:() => {},
    openEditModal: false,
    setOpenEditModal: () => {}
})

export const EditLogProvider = ({ children }: ChildProp) => {
    const [logData, setLogData] = useState<ExistingEntry | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenEditModal = (logData: ExistingEntry) => {
        setLogData(logData)
        setOpenEditModal(true)
    }

    const handleCloseEditModal = () => {
        setLogData(null);
        setOpenEditModal(false);
    }

    const contextValue = {
        logData, 
        setLogData, 
        openEditModal, 
        setOpenEditModal, 
        handleOpenEditModal, 
        handleCloseEditModal
    }

    return (
        <EditLogContext.Provider value={contextValue}>
            {children}
        </EditLogContext.Provider>
    )
}