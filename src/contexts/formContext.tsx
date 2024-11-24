import { createContext } from "react";
type formType = {
    [key: string]: string;
};
export interface FormContextProps {
    form: formType;
    setForm: (form: formType) => void;
}

export const FormContext = createContext<FormContextProps>({
    form: {},
    setForm: () => {},
});
