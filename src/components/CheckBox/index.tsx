import { ChangeEvent } from "react";
import styles from "./CheckBox.module.scss";
import { useFormHook } from "../../hooks/useFromHook";
import { FormContext } from "../../contexts/formContext";
interface CheckBoxProps {
    label: string;
    name: string;
    text: string;
    value: string;
    optValue: string;
    checked: boolean;
}
export function CheckBox({
    label,
    name,
    text,
    optValue,
    value,
}: CheckBoxProps) {
    const { form, change } = useFormHook(FormContext);
    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const value = JSON.parse(e.target.value);
        const [key, val] = Object.entries(value)[0];
        const isChecked = e.target.checked;

        if (!form[name]) {
            form[name] = JSON.stringify({});
        }

        let formObject;
        try {
            formObject = JSON.parse(form[name] as string);
        } catch (err) {
            console.error(err);
            formObject = {};
        }

        if (isChecked) {
            if (key == name) {
                console.log("key==name");
            }
            formObject[name] = val;
        } else {
            delete formObject[name];
        }
        change.value(name, formObject);
    }
    return (
        <label className={[styles.label, "pv-20", "ph-20"].join(" ")}>
            <input
                type="checkbox"
                onChange={onChange}
                value={value}
                name={name}
                className={styles.checkbox}
            />
            <div className={styles.textContainer}>
                <span className={styles.text}>{label}</span>
                <span className={[styles.descr, "fs-sm"].join(" ")}>
                    {text}
                </span>
            </div>
            <div className={[styles.price, "fw-r"].join(" ")}>{optValue}</div>
        </label>
    );
}
