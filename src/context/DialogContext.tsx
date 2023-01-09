import { createContext } from "react";
import { useToggle } from "../hooks/useToggle";

type DialogContextProps = {
    dialogMode: boolean,
    open: boolean,
    toggleDialogMode: () => void,
    setOpen: () => void,

}

export const DialogContext = createContext({} as DialogContextProps);

export function DialogProvider() {
    const { state: dialogMode, toggleState: setDialogMode } = useToggle();
    const { state: open, toggleState: setOpen } = useToggle();

    const toggleDialogDisplay = () => setOpen();
    const toggleDialogMode = () => setDialogMode();
    return <DialogContext.Provider value={{ dialogMode, toggleDialogMode, open:false, setOpen }}></DialogContext.Provider>
}