import styles from "./Input.module.scss";
export interface InputProps {
    label: string;
    type?: "text" | "email" | "phone";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}
export function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    errorMessage,
    required,
    disabled,
}: InputProps) {
    return (
        <>
            <label htmlFor={label} className={styles.label}>
                <span>{label}</span>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={styles.input}
                />
            </label>
            {error && <p className={styles.errorMessage}>{errorMessage}</p>};
        </>
    );
}
