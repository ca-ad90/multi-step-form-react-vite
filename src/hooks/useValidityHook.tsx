import {
    useState,
    useEffect,
    FocusEvent,
    ChangeEvent,
    MutableRefObject,
    ForwardedRef,
} from "react";
interface useHandleValidityProps {
    customValidation?: (val: string) => { msg: string; valid: boolean };
    updateValidity: (v: boolean, m: string) => void;
    update: (
        name: string,
        value: string | string[] | number[] | number,
        valid?: boolean,
    ) => void;
    required?: boolean;
}

export function useValidityHook(defaultValid = true, defaultMessage = "") {
    const [valid, setValid] = useState(defaultValid);
    const [msg, setMsg] = useState(defaultMessage);
    function updateValidity(valid: boolean, msg: string) {
        setValid(valid);
        setMsg(msg);
    }
    return {
        valid: valid,
        msg: msg,
        updateValidity: updateValidity,
    };
}
export function useHandleValidityHook(
    {
        update,
        customValidation = (v = "") => ({ valid: true, msg: v }),
        updateValidity,
        required,
    }: useHandleValidityProps,
    ref?: ForwardedRef<HTMLInputElement>,
) {
    const [isValid, setIsValid] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    ///const [input,setInput] = useState<HTMLInputElement|null>(null)
    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        e.target.checkValidity();
        const { name, value } = e.target;
        console.log("handleBlur", name, value);
        let valid, msg;
        if (value == "" && required) {
            e.target.setCustomValidity("");
            valid = e.target.checkValidity();
            msg = e.target.validationMessage;
            console.log("required", valid, msg);
        } else {
            const error = customValidation(value);
            valid = error.valid;
            msg = error.msg;
        }
        updateValidity(valid, msg);
        setIsValid(valid);
        setErrMsg(msg);
        update(name, value, valid);
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        const { msg, valid } = customValidation(value);

        if (value == "" && required) {
            e.target.setCustomValidity("");
            return;
        }

        if (!isValid && e.target.validity.customError) {
            if (!valid && msg != errMsg) {
                setErrMsg("pending");
                return;
            }
            updateValidity(valid, msg);
            setIsValid(valid);
            setErrMsg(msg);
        }
        const input = e.target;
        if (!input) return;
        if (!valid && errMsg == "pending") {
            updateValidity(true, "");
            return;
        }
        if (!valid) {
            input.setCustomValidity(msg);
        } else {
            input.setCustomValidity("");
        }
        updateValidity(valid, msg);
        update(name, value, valid);
    }
    useEffect(() => {
        const input =
            ref != null
                ? (ref as MutableRefObject<HTMLInputElement>).current
                : null;
        if (!input) return;
        if (!isValid && errMsg == "pending") {
            updateValidity(true, "");
            return;
        }
        if (!isValid) {
            input.setCustomValidity(errMsg);
        } else {
            input.setCustomValidity("");
        }
        updateValidity(isValid, errMsg);
    }, [isValid, errMsg, updateValidity, ref]);
    return {
        setIsValid: setIsValid,
        setErrMsg: setErrMsg,
        handleBlur,
        handleChange,
        ref,
    };
}
