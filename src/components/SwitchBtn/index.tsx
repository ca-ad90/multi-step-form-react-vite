import { FormContext } from "../../contexts/formContext";
import { useFormHook } from "../../hooks/useFromHook";
import styles from "./switchBtn.module.scss";
import { useRef } from "react";
export interface SwitchBtnProps {
    options: { label: string; value: string | number }[];
    name: string;
}
export function SwitchButton({ options, name }: SwitchBtnProps) {
    const { change } = useFormHook(FormContext);
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

    return (
        <div className={styles.container}>
            <label className={[styles.alt1, styles.label].join(" ")}>
                {options[0].label}
                <input
                    ref={(el) => (inputs.current[0] = el!)}
                    type="radio"
                    name={name}
                    value={options[0].value}
                    onInput={change.event}
                    checked={
                        inputs.current[0] ? inputs.current[0].checked : true
                    }
                />
            </label>
            <button
                type="button"
                onClick={switchOption}
                className={styles.switch}>
                <div className={styles.ball}></div>
            </button>
            <label className={[styles.alt2, styles.label].join(" ")}>
                {options[1].label}
                <input
                    ref={(el) => (inputs.current[1] = el!)}
                    type="radio"
                    name={name}
                    value={options[1].value}
                    onInput={change.event}
                />
            </label>
        </div>
    );
}
