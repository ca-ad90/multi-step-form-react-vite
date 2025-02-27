import { useRef, ChangeEvent } from "react";
import cbstyle from "./checkBox.module.scss";
import radioStyle from "./Radiobutton.module.scss";
import inpStyle from "./Input.module.scss";
//import switchStyle from "./switchBtn.module.scss";
import {
    useHandleValidityHook,
    useValidityHook,
} from "../../hooks/useValidityHook";
import {
    useSessionStorage,
    useFromStorage,
} from "../../hooks/useSessionStorageHook";
import switchStyle from "./switchBtn.module.scss";
interface TextInputProps {
    customValidation?: (val: string) => { msg: string; valid: boolean };
    updateValidity: (v: boolean, m: string) => void;
    name: string;
    type: string;
    label?: string;
    className?: string;
    required?: boolean;
    text?: string;
    placeholder?: string;
    value?: string | number;
}
type InputFieldProps = Omit<TextInputProps, "updateValidity">;

export const TextInputField = ({
    name,
    type = "text",
    customValidation = (v = "") => ({ msg: v, valid: true }),
    updateValidity,
    ...props
}: TextInputProps) => {
    const [, setTextValue] = useSessionStorage(name);
    const { setIsValid, setErrMsg, handleBlur, handleChange } =
        useHandleValidityHook({
            update: (n, v) => {
                setTextValue(v);
            },
            customValidation,
            updateValidity,
            required: props.required,
        });

    return (
        <input
            {...props}
            name={name}
            type={type == "email" ? "text" : type || "text"}
            className={props.className}
            onChange={handleChange}
            onInvalid={(err: React.FormEvent<HTMLInputElement>) => {
                setErrMsg((err.target as HTMLInputElement).validationMessage);
                setIsValid(false);
            }}
            onBlur={handleBlur}
        />
    );
};

export const Input = (props: InputFieldProps) => {
    const { label, required } = props;
    const { valid, msg, updateValidity } = useValidityHook(true, "");
    return (
        <>
            <label htmlFor={props.label} className={inpStyle.label}>
                <div className={inpStyle.textContainer}>
                    <span className={inpStyle.title}>
                        {label}
                        {required && (
                            <span className={inpStyle.required}>*</span>
                        )}
                    </span>
                    {!valid && <span className={inpStyle.errorMsg}>{msg}</span>}
                </div>
                <TextInputField
                    {...props}
                    updateValidity={updateValidity}
                    className={[
                        inpStyle.input,
                        !valid ? inpStyle.isInvalid : "",
                    ].join(" ")}
                />
            </label>
        </>
    );
};

type Option = {
    value: number[];
    label: string;
    icon?: string;
    text?: string;
};
interface CheckBoxGroupProps {
    options: Option[];
    name: string;
    styles?: { [key: string]: string };
    className?: string;
}
interface CheckBoxProps {
    value: number[];
    label: string;
    name: string;
    className?: string;
    required?: boolean;
    styles?: { [key: string]: string };
    text?: string;
    time?: string | null;
}

export const CheckBoxGroup = ({
    options,
    name,
    ...props
}: CheckBoxGroupProps) => {
    return (
        <>
            {options.map((e, i) => (
                <CheckBox
                    {...e}
                    value={e.value}
                    className={props.className}
                    data-index={i}
                    key={i}
                    name={name}
                />
            ))}
        </>
    );
};
export const CheckBox = ({
    name,
    styles = cbstyle,
    text,
    ...props
}: CheckBoxProps) => {
    const [chkBoxValue, setChkBoxValue] = useSessionStorage(name);
    const [timeValue] = useSessionStorage("time");
    const { getNameValue, setNameValue } = useFromStorage("form");

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { checked } = e.target;
        const oldValue = chkBoxValue ? chkBoxValue : {};
        const oldFormValue = getNameValue(name) ? getNameValue(name) : {};
        if (checked) {
            console.log(oldValue);
            oldValue[props.label] = props.value;
            setChkBoxValue(oldValue);
            setNameValue(name, oldFormValue);
        } else {
            delete oldValue[props.label];
            setChkBoxValue(oldValue);
            setNameValue(name, oldValue);
        }
    }
    return (
        <label className={[styles.label, "pv-20", "ph-20"].join(" ")}>
            <input
                {...props}
                value={JSON.stringify(props.value)}
                type="checkbox"
                name={name}
                className={styles.checkbox}
                onChange={handleChange}
            />
            <div className={styles.textContainer}>
                <span className={styles.text}>{props.label}</span>
                <span className={[styles.descr, "fs-sm"].join(" ")}>
                    {text}
                </span>
            </div>
            <div className={[styles.price, "fw-r"].join(" ")}>
                {timeValue == "m" && `$${props.value[0]}/mo`}
                {timeValue == "y" && `$${props.value[1]}/yr`}
            </div>
        </label>
    );
};

/* RADIO BUTTONS*/
interface RadioComponentProps {
    name: string;
    updateValidity: (v: boolean, m: string) => void;
    label: string;
    className?: string;
    checked?: boolean;
    placeholder?: string;
    value: number[];
    icon?: string;
    selected?: boolean;
    optValue?: string;
    required?: boolean;
    styles?: { [key: string]: string };
    index?: number;
}
interface RadioGroupProps {
    options: Option[];
    required?: boolean;
    name: string;
    styles?: { [key: string]: string };
}
export const RadioGroup = ({
    options,
    name,
    required = false,
    styles = radioStyle,
}: RadioGroupProps) => {
    const { valid, msg, updateValidity } = useValidityHook(true, "");
    return (
        <>
            <fieldset
                className={`${valid ? "" : "invalid"} ${
                    styles && styles.fieldset
                }`}>
                {!valid && <p className={styles.invalidText}>{msg}</p>}
                {options.map((e, i) => (
                    <Radio
                        {...e}
                        value={e.value}
                        required={required && i == 0 ? true : false}
                        styles={styles}
                        index={i}
                        key={i}
                        updateValidity={updateValidity}
                        name={name}
                    />
                ))}
            </fieldset>
        </>
    );
};
export const Radio = ({
    icon,
    name,
    updateValidity,
    styles = radioStyle,
    ...props
}: RadioComponentProps) => {
    const [radioValue, setValue] = useSessionStorage(name);
    const { setNameValue } = useFromStorage("form");
    const [timeValue] = useSessionStorage("time");
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            console.log(radioValue, props.value);
            setValue({ [props.label]: props.value });
            setNameValue(name, { [props.label]: props.value });
        }
        updateValidity(true, "");
    }
    return (
        <label className={styles.label}>
            <div className={styles.icon}>
                <img src={icon} alt="" />
            </div>

            <input
                {...props}
                value={JSON.stringify(props.value)}
                name={name}
                type="radio"
                className={styles.radio}
                onChange={handleChange}
                onInvalid={() => {
                    updateValidity(false, "Please select one of the options");
                }}
            />

            <div className={styles.textContainer}>
                <span className={styles.text}>{props.label} </span>
                <span className={styles.descr}>
                    {timeValue == "y" && "$" + props.value[1] + "/yr"}
                    {timeValue == "m" && "$" + props.value[0] + "/mo"}
                </span>
                <p className={styles.optionalText}>
                    {timeValue == "y" && "2 month free"}
                </p>
            </div>
        </label>
    );
};

/* SWITCH BUTTON */
type SwitchOptionsProps = {
    value: string;
    label: string;
    selected?: boolean;
};
interface SwitchProps {
    options: SwitchOptionsProps[];
    styles?: { [key: string]: string };
    name: string;
}
export const Switch = ({
    styles = switchStyle,
    options,
    name,
    ...props
}: SwitchProps) => {
    const radioRef1 = useRef<HTMLInputElement>(null);
    const radioRef2 = useRef<HTMLInputElement>(null);
    const [value, setValue] = useSessionStorage(name, options[0].value);

    const { setNameValue } = useFromStorage("form");
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(value);
        setNameValue(name, value);
    }
    function handleClick() {
        if (radioRef1.current && radioRef2.current) {
            if (radioRef1.current.checked) {
                radioRef2.current.checked = true;
                radioRef1.current.checked = false;
                setValue(options[1].value);
                setNameValue(name, options[1].value);
            } else {
                radioRef1.current.checked = true;
                radioRef2.current.checked = false;
                setValue(options[0].value);
                setNameValue(name, options[0].value);
            }
        }
    }
    return (
        <>
            <div className={styles.container}>
                <label className={[styles.alt1, styles.label].join(" ")}>
                    {options[0].label}
                    <input
                        {...props}
                        ref={radioRef1}
                        type="radio"
                        name={name}
                        value={options[0].value}
                        className=""
                        onChange={handleChange}
                        checked={value ? value == options[0].value : true}
                    />
                </label>
                <button
                    type="button"
                    onClick={handleClick}
                    className={styles.switch}>
                    <div className={styles.ball}></div>
                </button>
                <label className={[styles.alt2, styles.label].join(" ")}>
                    {options[1].label}
                    <input
                        type="radio"
                        ref={radioRef2}
                        name={name}
                        value={options[1].value}
                        className={styles.radio}
                        onChange={handleChange}
                        checked={value ? value == options[1].value : false}
                    />
                </label>
            </div>
        </>
    );
};
