import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FormContext } from "../formContext";
export function useFormHook(context: typeof FormContext) {
    const [formState, setFormState] = useState({});
    const { form, setForm } = useContext(context);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormState({
            ...formState,
            [name]: value,
        });
        setForm({
            ...form,
            [name]: value,
        });
    };
    useEffect(() => {
        console.log("oinHook", form);
    }, [form]);
    return { form, handleChange, state: [formState, setFormState] } as const;
}
