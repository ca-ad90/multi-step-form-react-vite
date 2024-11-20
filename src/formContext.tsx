import { createContext, MutableRefObject } from "react";
export interface formContextProps {
    pages: { current: number; length: number };
    form: MutableRefObject<HTMLFormElement | null>;
    setPages: (pages: { current: number; length: number }) => void;
}
export const formContext = createContext<formContextProps>({
    pages: { current: 0, length: 0 },
    form: { current: null },
    setPages: () => {},
});
