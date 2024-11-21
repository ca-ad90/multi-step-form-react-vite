import styles from "./Radiobutton.module.scss";
interface RadiobuttonProps {
    price: string;
    label: string;
    value: string;
    icon: string;
    name: string;
    checked: boolean;
}
export function Radiobutton({
    name,
    label,
    price,
    value,
    icon,
}: RadiobuttonProps) {
    return (
        <label className={styles.label}>
            <input
                type="radio"
                name={name}
                className={styles.radio}
                required
                value={value}
            />
            <div className={styles.icon}>
                <img src={icon} alt="" />
            </div>
            <div className={styles.textContainer}>
                {" "}
                <span className={styles.text}>{label} </span>
                <span className={styles.descr}>{price}</span>
            </div>
        </label>
    );
}
