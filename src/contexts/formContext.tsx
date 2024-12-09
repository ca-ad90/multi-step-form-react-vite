import { createContext } from "react";
export type obj = {
    [key: string]: string | number | string[] | number[] | null;
};
export type formType = {
    [key: string]: {
        value: string | number | string[] | number[] | null | obj | obj[];
        valid: boolean;
    };
};
export interface FormContextProps {
    form: formType;
    setForm: (form: formType) => void;
}

export const FormContext = createContext<FormContextProps>({
    form: {},
    setForm: () => {},
});
