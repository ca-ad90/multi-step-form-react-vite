import { createContext, MutableRefObject } from "react";
export interface FormContextProps {
    pages: { current: number; length: number };
    form: MutableRefObject<HTMLFormElement | null>;
    setPages: (pages: { current: number; length: number }) => void;
}
export const FormContext = createContext<FormContextProps>({
    pages: { current: 0, length: 0 },
    form: { current: null },
    setPages: () => {},
});
