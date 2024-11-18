import { createContext } from "react";
export interface CurrentPageContext {
    pages: { current: number; length: number };
    setPages: (pages: { current: number; length: number }) => void;
}
export const currentPageContext = createContext<CurrentPageContext>({
    pages: { current: 0, length: 0 },
    setPages: () => {},
});
