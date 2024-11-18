import { useState, useEffect, useCallback, RefObject } from "react";

export const useInputBinding = (
    initialValue: string,
    inputRef: RefObject<HTMLInputElement>,
) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = useCallback((event: InputEvent) => {
        console.log("hangöeChange");
        setValue((event.target as HTMLInputElement).value);
    }, []);

    useEffect(() => {
        console.log("useEffect");
        console.log(inputRef);
        if (inputRef.current) {
            inputRef.current.addEventListener(
                "input",
                handleChange as EventListener,
            );
        }
    }, []);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = value;
        }
    }, [value]);

    return [value, setValue, inputRef] as const;
};
