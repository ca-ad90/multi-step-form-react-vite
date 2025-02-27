import { createContext } from "react";
export interface FormContextProps {
    formPage: number;
    setFormPage: (form: number) => void;
}

export const FormContext = createContext<FormContextProps>({
    formPage: 0,
    setFormPage: () => {},
});
