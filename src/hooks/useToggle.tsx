import { useState } from "react";

export function useToggle() {
    const [state, setState] = useState(false);
    function toggleState() {
        setState(prevState => !prevState);
    }
    return { state, toggleState }
}