import { useState } from "react";
import styles from "./CheckBox.module.scss";
interface CheckBoxProps {
    label: string;
    price: string;
    name: string;
    descr: string;
    value: string;
    checked: boolean;
}
export function CheckBox({
    label,
    name,
    price,
    descr,
    value,
    checked,
}: CheckBoxProps) {
    const [isChecked, setIsChecked] = useState(checked);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(e.target.checked);
    }
    return (
        <label className={styles.label}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                value={value}
                name={name}
                className={styles.checkbox}
            />
            <div className={styles.textContainer}>
                <span className={styles.text}>{label}</span>
                <span className={styles.descr}>{descr}</span>
            </div>
            <div className={styles.price}>{price}/mo</div>
        </label>
    );
}
