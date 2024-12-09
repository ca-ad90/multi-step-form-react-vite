import { useContext, Context } from "react";
import { FormContextProps } from "../contexts/formContext";

export function useFormHook(context: Context<FormContextProps>) {
    const { form, setForm } = useContext(context);
    function updateValue(
        name: string,
        value: string | number | string[] | number[] | null,
        valid = true,
    ) {
        setForm({ ...form, [name]: { value: value, valid: valid } });
        console.log("form:", form);
    }

    /*     useEffect(()=>{
        setForm(formState)
        console.log("\n--fired on formState change--")
        console.log("form:", form);
        console.log("formState", formState);
        console.log("----------\n")
    },[formState]) */
    return { form, updateValue, setForm } as const;
}
