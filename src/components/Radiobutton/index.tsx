import styles from "./Radiobutton.module.scss";
import { HTMLAttributes, useEffect, useState } from "react";
interface RadiobuttonProps {
    price: [number, number];
    label: string;
    icon: string;
    name: string;
    form?: { [key: string]: string | string[] | number | number[] };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Radiobutton({
    name,
    label,
    price,
    icon,
    form,
    handleChange,
}: RadiobuttonProps) {
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
    const [currentPrice, setCurrentPrice] = useState(price[0]);
    useEffect(() => {
        if (form && (form!["period"] as string) === "year") {
            setCurrentPrice(price[0]);
        }
    }, [form]);
    return (
        <label htmlFor={id} className={styles.label}>
            <input
                id={id}
                tabIndex={0}
                type="radio"
                name={name}
                className={styles.radio}
                required
                value={currentPrice}
                onChange={handleChange}
            />
            <div className={styles.icon}>
                <img src={icon} alt="" />
            </div>
            <div className={styles.textContainer}></div>
            <span className={styles.text}>{label} </span>
            <span className={styles.descr}>{`$${currentPrice}/${
                (form &&
                    form.period &&
                    (form.period as string).substring(0, 2)) ||
                "mo"
            }`}</span>
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
          };
    return <div style={style}>{children}</div>;
}
