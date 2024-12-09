import { useState } from "react";
import styles from "./Input.module.scss";
import { useFormHook } from "../../hooks/useFromHook";
import { FormContext } from "../../contexts/formContext";
export interface InputProps {
    label: string;
    name: string;
    type?: "text" | "email" | "phone";
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}
export function Input({
    label,
    name,
    type = "text",
    placeholder,
    error,
    errorMessage,
    required,
    disabled,
}: InputProps) {
    const { change } = useFormHook(FormContext);
    const [invalid, setInvalid] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    function checkInput(e: React.ChangeEvent<HTMLInputElement>) {
        let isInvalid = false;
        let err;
        const { name, value } = e.target;
        console.log("checkStart", !value);
        if (required && !value) {
            console.log("req:emptuy");
            isInvalid = true;
            err = "This field is required";
        } else {
            switch (type) {
                case "email":
                    console.log("type:email", value);
                    isInvalid = !validateEmail(value);
                    err = "Please enter a valid email";
                    break;
                case "phone":
                    console.log("type:phone", value);
                    isInvalid = !validatePhone(value);
                    err = "Please enter a valid phone number";
                    break;
                default:
                    console.log("type:default", value);
                    err = "Invalid input";
                    break;
            }
            err = errorMessage || err;
        }
        if (isInvalid) {
            setErrMsg(err);
            e.target.setCustomValidity(err);
            change.value(name, null);
        } else {
            e.target.setCustomValidity("");
            change.event(e);
        }
        setInvalid(isInvalid);
        return;
    }
    // AI generated function to validate email
    function validateEmail(email: string) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) || email.trim() === "";
    }

    function validatePhone(phone: string) {
        const re = /^(\+\d{1,2}\s?-?)?(\d\s?)*\d$/;
        return re.test(String(phone).toLowerCase());
    }
    return (
        <>
            <label htmlFor={label} className={styles.label}>
                <div className={styles.textContainer}>
                    <span className={styles.title}>
                        {label}{" "}
                        {required && <span className={styles.required}>*</span>}
                    </span>
                    {invalid && (
                        <span className={styles.errorMsg}>{errMsg}</span>
                    )}
                </div>
                <input
                    name={name}
                    id={label.replace(/\s/g, "-").toLocaleLowerCase()}
                    type={type}
                    placeholder={placeholder}
                    onBlur={checkInput}
                    onChange={change.event}
                    required={required}
                    disabled={disabled}
                    className={[
                        styles.input,
                        invalid ? styles.isInvalid : "",
                    ].join(" ")}
                    onInvalid={() => {
                        setInvalid(true);
                    }}
                />
            </label>
            {error && <p className={styles.errorMessage}>{errorMessage}</p>}
        </>
    );
}
