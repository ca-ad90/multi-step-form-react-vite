import { useRef, useState } from "react";
import styles from "./Input.module.scss";
export interface InputProps {
    label: string;
    type?: "text" | "email" | "phone";
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}
export function Input({
    label,
    type = "text",
    placeholder,
    error,
    errorMessage,
    required,
    disabled,
}: InputProps) {
    const [invalid, setInvalid] = useState(false);
    const inpRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState("");

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("onChange", !inpRef.current?.value);
        let isInvalid = false;
        let err;
        if (required && !e.target.value) {
            isInvalid = true;
            err = "This field is required";
        } else {
            switch (type) {
                case "email":
                    isInvalid = !validateEmail(e.target.value);
                    err = "Please enter a valid email";
                    break;
                case "phone":
                    isInvalid = !validatePhone(e.target.value);
                    err = "Please enter a valid phone number";
                    break;
                default:
                    err = "Invalid input";
                    break;
            }
            err = errorMessage || err;
        }
        setErrMsg(err);
        setInvalid(isInvalid);

        return;
    }
    // AI generated function to validate email
    function validateEmail(email: string) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) || email.trim() === "";
    }
    // AI generated function to validate phone
    function validatePhone(phone: string) {
        const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        re.test(String(phone).toLowerCase());
        return true;
    }

    ["This Field is required", "Invalid input"].forEach((msg) => {
        console.log(msg);
    });
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
                    ref={inpRef}
                    id={label.replace(/\s/g, "-").toLocaleLowerCase()}
                    name={label}
                    type={type}
                    placeholder={placeholder}
                    onBlur={onChange}
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
