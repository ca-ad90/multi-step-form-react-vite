import { createContext } from "react";
export interface PageContextProps {
    pages: { current: number; length: number };
    setPages: ({
        current,
        length,
    }: {
        current: number;
        length: number;
    }) => void;
}

export const pageContext = createContext<PageContextProps>({
    pages: { current: 0, length: 0 },
    setPages: () => {},
});
