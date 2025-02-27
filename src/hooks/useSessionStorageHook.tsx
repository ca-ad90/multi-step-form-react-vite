import { useState, useEffect, ChangeEvent } from "react";

export function useSessionStorage<T>(key: string, initialValue?: T) {
    const [value, setValue] = useState(() => {
        if (!initialValue) {
            const item = sessionStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            } else {
                return "";
            }
        } else {
            try {
                const item = sessionStorage.getItem(key);
                if (!item) {
                    sessionStorage.setItem(key, JSON.stringify(initialValue));
                }
                return item ? JSON.parse(item as string) : initialValue;
            } catch (error) {
                sessionStorage.setItem(key, JSON.stringify(initialValue));
                console.log(error as Error);
                return initialValue;
            }
        }
    });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        window.addEventListener(
            "storage",
            (event) => {
                if (
                    key == event.key &&
                    event.storageArea == window.sessionStorage
                ) {
                    try {
                        setValue(
                            event.newValue
                                ? JSON.parse(event.newValue)
                                : initialValue,
                        );
                    } catch (err) {
                        console.error(err);
                        setValue(initialValue);
                    }
                }
            },
            { signal: signal },
        );
        return () => {
            controller.abort();
        };
    }, [key, initialValue]);

    const updateValue = (value: T) => {
        try {
            const newValue =
                value instanceof Function ? value(value) : (value as T);
            const newStorageEvent = new StorageEvent("storage", {
                key: key,
                newValue: JSON.stringify(newValue),
                oldValue: JSON.stringify(value),
                storageArea: window.sessionStorage,
            });
            window.dispatchEvent(newStorageEvent);
            sessionStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.log(error as Error);
        }
    };
    const eventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            try {
                updateValue(event.target.value as unknown as T);
            } catch {
                console.log("update failed");
            }
        }
    };
    return [value, updateValue, eventHandler];
}

export function useFromStorage(formName: string) {
    const [formValue, setFormValue] = useSessionStorage(formName);

    const setNameValue = (name: string, value: unknown) => {
        setFormValue({ ...formValue, [name]: value });
    };

    const getNameValue = (name: string) => {
        return formValue[name];
    };
    return { getNameValue, setNameValue };
}
