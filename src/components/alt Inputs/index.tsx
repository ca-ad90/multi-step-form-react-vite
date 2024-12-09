import {
    useState,
    useRef,
    forwardRef,
    ChangeEvent,
    FocusEvent,
    ForwardedRef,
    useEffect,
    Dispatch,
    SetStateAction,
    MutableRefObject,
} from "react";
interface InputProps {
    childRef?: {
        current:
            | HTMLInputElement[]
            | HTMLInputElement
            | HTMLOptionElement[]
            | null;
    };
    customValidation?: (val: string) => { msg: string; valid: boolean };
    index?: string | number;
    name: string;
    type: string;
    update: (
        name: string,
        value: string | string[] | number[] | number,
        valid?: boolean,
    ) => void;
    onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    className?: string;
    checked?: boolean;
    required?: boolean;
    styles: { [key: string]: string };
    text?: string;
    placeholder?: string;
}
interface InputComponentProps extends InputProps {
    setLabel?: Dispatch<SetStateAction<{ invalid: boolean; errMsg: string }>>;
}

type Option = {
    value: string | number | string[] | number[];
    label: string;
    selected: boolean;
    icon?: string;
    text?: string;
};

type GroupProps = {
    type: "select" | "checkbox" | "radio";
    options: Option[];
    update: (name: string, value: string | string[]) => void;
    name: string;
    value?: string | string[];
    multi?: boolean;
    className?: string;
    styles: { [key: string]: string };
};

export const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
    (
        {
            name,
            type = "text",
            update,
            customValidation = () => ({ msg: "", valid: true }),
            ...props
        },
        ref,
    ) => {
        const [isValid, setIsValid] = useState(false);
        const [errMsg, setErrMsg] = useState("");
        function handleBlur(e: FocusEvent<HTMLInputElement>) {
            const { value } = e.target;
            const { msg, valid } = customValidation(value);
            setIsValid(valid);
            setErrMsg(msg);
        }
        function handleChange(e: ChangeEvent<HTMLInputElement>): void {
            const { name, value } = e.target;
            if (!isValid) {
                const { msg, valid } = customValidation(value);
                setIsValid(valid);
                setErrMsg(msg);
            }

            update(name, value);
        }
        useEffect(() => {
            const input =
                ref != null
                    ? (ref as MutableRefObject<HTMLInputElement>).current
                    : null;
            if (!input) return;
            if (!isValid) {
                input.setCustomValidity(errMsg);
            } else {
                input.setCustomValidity("");
            }
        }, [isValid]);
        useEffect(() => {
            if (props.setLabel)
                props.setLabel({ invalid: !isValid, errMsg: errMsg });
        }, [errMsg, isValid]);
        return (
            <input
                ref={ref}
                name={name}
                type={type || "text"}
                onInput={handleChange}
                className={[
                    props.styles.input,
                    !isValid ? props.styles.isInvalid : "",
                ].join(" ")}
                {...props}
                onInvalid={(err) => {
                    console.log("invalidErr", err);
                    setIsValid(false);
                }}
                onBlur={handleBlur}
            />
        );
    },
);

export const Group = forwardRef<
    (HTMLSelectElement | HTMLOptionElement | null)[],
    GroupProps
>(({ type, options, update, name, multi, styles, ...props }: GroupProps) => {
    const [stateValue, setValue] = useState<string[] | number[]>([]);
    const [optionState, setOptions] = useState<Option[]>(options);
    const groupRef = useRef<(HTMLInputElement | HTMLOptionElement | null)[]>(
        [],
    );

    multi = multi === undefined ? type === "checkbox" : multi;

    function updateGroupValue(
        element: HTMLInputElement | HTMLOptionElement | null,
        index?: number,
    ): void {
        let checked;
        let value = stateValue;
        if (element instanceof HTMLOptionElement) {
            checked = !element?.dataset.selected;
        } else if (element instanceof HTMLInputElement) {
            checked = element.checked;
        } else {
            checked = false;
        }
        let options = JSON.parse(JSON.stringify(optionState)) as Option[];

        if (typeof index === "number") {
            options[index].selected = checked;
            options = multi
                ? options
                : options.map((e, i) => ({
                      ...e,
                      selected: i === index,
                  }));

            value = options
                .filter((e) => e.selected)
                .map((e) => e.value as string);
        }

        const finalValue = multi ? value : value[0];
        setOptions(options);
        setValue(value);
        update(name, finalValue as string | string[]);
    }
    //useEffect(updateGroupValue, []);

    return type === "select" ? (
        <select
            name={name}
            {...props}
            onChange={(event) => {
                const index = event.target.selectedIndex;
                updateGroupValue(
                    groupRef.current[index] as HTMLOptionElement,
                    index,
                );
            }}
            className={props.className}>
            {options.map((e, i) => (
                <option
                    key={i}
                    data-selected={e.selected}
                    data-index={i}
                    ref={(el) =>
                        (groupRef.current[i] = el as HTMLOptionElement)
                    }
                    {...e}
                    value={e.value as string}>
                    {e.label}
                </option>
            ))}
        </select>
    ) : type === "radio" ? (
        <>
            {options.map((e, i) => (
                <Radio
                    styles={styles}
                    className={props.className}
                    data-index={i}
                    key={i}
                    ref={(el) => (groupRef.current[i] = el)}
                    name={name}
                    update={() => {
                        updateGroupValue(
                            groupRef.current[i] as HTMLInputElement,
                            i,
                        );
                    }}
                    type={type}
                    checked={e.selected}
                    {...e}
                />
            ))}
        </>
    ) : (
        <>
            {options.map((e, i) => (
                <ChkBox
                    styles={styles}
                    className={props.className}
                    data-index={i}
                    key={i}
                    ref={(el) => (groupRef.current[i] = el)}
                    name={name}
                    update={() => {
                        updateGroupValue(
                            groupRef.current[i] as HTMLInputElement,
                            i,
                        );
                    }}
                    type={type}
                    checked={e.selected}
                    {...e}
                />
            ))}
        </>
    );
});

export const Input = forwardRef(
    (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const { label, styles, required } = props;
        const [input, fromInput] = useState({ invalid: false, errMsg: "" });
        return (
            <>
                <label htmlFor={props.label} className={styles.label}>
                    <div className={styles.textContainer}>
                        <span className={styles.title}>
                            {label}
                            {required && (
                                <span className={styles.required}>*</span>
                            )}
                        </span>
                        {input.invalid && (
                            <span className={styles.errorMsg}>
                                {input.errMsg}
                            </span>
                        )}
                    </div>
                    <InputComponent ref={ref} {...props} setLabel={fromInput} />
                </label>
            </>
        );
    },
);
export const ChkBox = forwardRef(
    (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const [input, fromInput] = useState({ invalid: false, errMsg: "" });
        return (
            <label className={[props.styles.label, "pv-20", "ph-20"].join(" ")}>
                <InputComponent ref={ref} {...props} setLabel={fromInput} />
                <div className={props.styles.textContainer}>
                    <span className={props.styles.text}>{props.label}</span>
                    <span className={[props.styles.descr, "fs-sm"].join(" ")}>
                        {props.text}
                    </span>
                </div>
                <div className={[props.styles.price, "fw-r"].join(" ")}>
                    {props.label + " hejjo"}
                </div>
            </label>
        );
    },
);
export const Radio = (props) => {
    const { styles } = props;
    return (
        <label className={styles.label}>
            <div className={styles.icon}>
                <img src={props.icon} alt="" />
            </div>
            <InputComponent {...props} />
            <div className={styles.textContainer}>
                <span className={styles.text}>{props.label} </span>
                <span className={styles.descr}>{props.optValue}</span>
                <p className={styles.optionalText}> {props.text}</p>
            </div>
        </label>
    );
};
