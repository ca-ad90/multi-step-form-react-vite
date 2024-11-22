import styles from "./switchBtn.module.scss";
import { ChangeEvent, useEffect, useRef } from "react";
export interface SwitchBtnProps {
    options: string[];
    name: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    form?: { [key: string]: string | string[] | number | number[] };
}
export function SwitchButton({
    options,
    name,
    handleChange,
    form,
}: SwitchBtnProps) {
    const inputs = useRef<HTMLInputElement[]>([]);
    function switchOption() {
        if (inputs.current) {
            if (inputs.current[0].checked) {
                inputs.current[1].click();
            } else {
                inputs.current[0].click();
            }
        }
    }
    useEffect(() => {
        console.log(form);
    }, [form]);
    return (
        <div className={styles.container}>
            <label className={[styles.alt1, styles.label].join(" ")}>
                {options[0]}
                <input
                    ref={(el) => (inputs.current[0] = el!)}
                    type="radio"
                    name={name}
                    value={options[0].toLowerCase()}
                    onInput={handleChange}
                    onChange={handleChange}
                />
            </label>
            <button
                type="button"
                onClick={switchOption}
                className={styles.switch}>
                <div className={styles.ball}></div>
            </button>
            <label className={[styles.alt2, styles.label].join(" ")}>
                {options[1]}
                <input
                    ref={(el) => (inputs.current[1] = el!)}
                    type="radio"
                    name={name}
                    value={options[1].toLowerCase()}
                    onInput={handleChange}
                />
            </label>
        </div>
    );
}
