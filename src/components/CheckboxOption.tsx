import { Component, useState, useRef, forwardRef, useEffect } from "react";
import {} from "react";

export const InputComponent = forwardRef(
    (
        {
            childRef,
            name,
            form,
            type,
            update,
            onSetChange,
            onInput,
            onChange,
            ...props
        },
        ref,
    ) => {
        const [stateValue, setValue] = useState("");
        function handleChange(e) {
            let { name, value } = e.target;
            setValue(value);
            update(name, value);
        }
        return (
            <label>
                {props.label ? props.label : ""}
                <input
                    ref={childRef}
                    name={name}
                    type={type || "text"}
                    onInput={handleChange}
                    className={props.className ? props.className : ""}
                    {...props}
                />
            </label>
        );
    },
);

export const Group = forwardRef(
    ({ type, options, update, name, value, multi, ...props }, ref) => {
        const [stateValue, setValue] = useState([]);
        const [optionState, setOptions] = useState(options);
        const groupRef = useRef([]);
        multi =
            multi == undefined ? (type == "checkbox" ? true : false) : multi;

        function updateGroupValue(element, index) {
            let { checked, value } = element
                ? element
                : { checked: false, value: stateValue };

            checked = type == "select" ? !element.dataset.selected : checked;
            let val = value;
            let options = JSON.parse(JSON.stringify(optionState));

            if (index || index == 0) {
                options[index].selected = checked;
                options = multi
                    ? options
                    : (options = options.map((e, i) => {
                          e.selected = i == index;
                          return e;
                      }));

                val = options.filter((e) => e.selected).map((e) => e.value);
            }
            val = multi ? val : val[0];
            console.log("Gval", val, options);
            setOptions(options);
            setValue(val);
            console.log(type, multi);
            update(name, val);
        }
        //useEffect(updateGroupValue, []);

        return type == "select" ? (
            <select
                name={name}
                {...props}
                onChange={(event) => {
                    let index = event.target.selectedIndex;
                    updateGroupValue(groupRef.current[index], index);
                }}>
                {options.map((e, i) => (
                    <option
                        data-selected={e.selected}
                        data-index={i}
                        ref={(el) => (groupRef.current[i] = el)}
                        value={e.value}>
                        {e.label}
                    </option>
                ))}
            </select>
        ) : (
            <>
                {options.map((e, i) => (
                    <>
                        <InputComponent
                            data-index={i}
                            childRef={(el) => (groupRef.current[i] = el)}
                            name={name}
                            update={() => {
                                updateGroupValue(groupRef.current[i], i);
                            }}
                            type={type}
                            value={e.value}
                            checked={e.selected}
                            {...e}
                        />
                    </>
                ))}
            </>
        );
    },
);
