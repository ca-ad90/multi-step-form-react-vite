import { FormContext } from "../../contexts/formContext";
import { useFormHook } from "../../hooks/useFromHook";
import styles from "./Radiobutton.module.scss";
import { HTMLAttributes, useEffect } from "react";
type obj = { [key: string]: string | number };
interface RadiobuttonProps {
    optValue: number | string;
    label: string;
    icon: string;
    name: string;
    form?: { [key: string]: string | string[] | number | number[] };
    text?: string;
    value: string | string[] | obj | obj[];
}
export function Radiobutton({
    name,
    label,
    optValue,
    icon,
    text,
    value,
}: RadiobuttonProps) {
    const { form, change } = useFormHook(FormContext);
    function idGen() {
        let str = "";
        const randomChar = (type: number) => {
            let min, max;
            switch (type) {
                case 0:
                    min = "a".charCodeAt(0);
                    max = "z".charCodeAt(0);
                    break;
                case 1:
                    min = "A".charCodeAt(0);
                    max = "Z".charCodeAt(0);
                    break;
                case 2:
                    min = 0;
                    max = 9;
                    break;
                default:
                    min = 0;
                    max = 9;
            }
            const code = Math.floor(Math.random() * (max - min + 1) + max);
            if (type < 2) {
                return String.fromCharCode(code);
            } else {
                return code;
            }
        };
        do {
            const char = randomChar(Math.floor(Math.random() * 3));
            str += char;
        } while (str.length > 5);
        return str;
    }
    const id = `${name}-${idGen()}`;

    return (
        <label htmlFor={id} className={styles.label}>
            <input
                id={id}
                tabIndex={0}
                type="radio"
                name={name}
                className={styles.radio}
                required
                value={value as string}
                onChange={(e) => {
                    let val;
                    try {
                        val = JSON.parse(e.target.value);
                    } catch {
                        val = e.target.value;
                    }
                    change.event(name, val);
                }}
            />
            <div className={styles.icon}>
                <img src={icon} alt="" />
            </div>
            <div className={styles.textContainer}>
                <span className={styles.text}>{label} </span>
                <span className={styles.descr}>{optValue}</span>
                <p className={styles.optionalText}> {text}</p>
            </div>
        </label>
    );
}

export function RadioGroup({
    children,
    ...props
}: HTMLAttributes<HTMLInputElement>) {
    const style = props.style
        ? props.style
        : {
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              position: "relative",
          };
    return <fieldset style={style}>{children}</fieldset>;
}
