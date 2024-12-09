import { ReactNode, useEffect, useRef } from "react";
import styles from "./Page.module.scss";
import { Group, Input } from "../components/alt Inputs";
import { useFormHook } from "../hooks/useFromHook";
import { FormContext } from "../contexts/formContext";
import inputStyles from "../components/alt Inputs/Input.module.scss";
import radioStyles from "../components/alt Inputs/Radiobutton.module.scss";
import chkBoxStyles from "../components/alt Inputs/checkBox.module.scss";

interface PageProps {
    title: string;
    text: string;
    children: ReactNode;
}

export function Page(props: PageProps) {
    const { title, text, children } = props;
    const header = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (header.current) {
            header.current.focus();
        }
    }, [title]);
    return (
        <>
            <h1 tabIndex={-1} ref={header}>
                {title}
            </h1>
            <p id={`page${1}`}>{text}</p>
            <div className={styles.content}>{children}</div>
        </>
    );
}
function validateEmail(email: string) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) || email.trim() === "";
}

function validatePhone(phone: string) {
    const re = /^(\+\d{1,2}\s?-?)?(\d\s?)*\d$/;
    return re.test(String(phone).toLowerCase());
}
const validation: {
    [key: string]: (v: string) => { msg: string; valid: boolean };
} = {
    email: (value: string) => {
        console.log("type:email", value);
        const valid = validateEmail(value);
        const msg = "Please enter a valid email";
        return { valid, msg };
    },
    phone: (value: string) => {
        console.log("type:phone", value);
        const valid = validatePhone(value);
        const msg = "Please enter a valid phone number";
        return { valid, msg };
    },
};
export function FirstPage() {
    const { updateValue } = useFormHook(FormContext);
    function updateForm(
        name: string,
        value: string | string[] | number[] | number,
        valid?: boolean,
    ): void {
        if (valid) {
            updateValue(name, value, valid);
        }
    }
    const inpRef = useRef<HTMLInputElement[]>([]);

    const inputOptions = [
        { name: "name", type: "text", label: "Enter" },
        { name: "email", type: "email", label: "Enter" },
        { name: "phone", type: "phone", label: "Enter" },
    ];

    return (
        /*
Name
*/
        <Page
            title="Personal info"
            text="Please provide your name, email address, and phone number.">
            <Input
                name={"name"}
                type={"text"}
                update={updateForm}
                styles={inputStyles}
                label={"Nme"}
                placeholder="e.g. Stephen King"
                required
            />

            <Input
                name={"email"}
                type={"email"}
                update={updateForm}
                styles={inputStyles}
                label={"Email Address"}
                customValidation={validation.email}
                placeholder="e.g. stephenking@lorem.com"
                required
            />
            <Input
                name={"phone"}
                type={"phone"}
                update={updateForm}
                customValidation={validation.phone}
                styles={inputStyles}
                label={"Phone Number"}
                placeholder="e.g. +1
234 567 890 Next Step "
                required
            />
        </Page>
    );
}
export function SecondPage() {
    const { updateValue } = useFormHook(FormContext);
    function updateForm(
        name: string,
        value: string | string[] | number[] | number,
        valid?: boolean,
    ): void {
        if (valid) {
            updateValue(name, value, valid);
        }
    }
    const inpRef = useRef([]);
    const radioOptions = [
        {
            label: "Arcade",
            value: 9,
            icon: "../src/assets/images/icon-arcade.svg",
            selected: false,
        },
        {
            label: "Advanced",
            value: 12,
            icon: "../src/assets/images/icon-advanced.svg",
            selected: false,
        },
        {
            label: "Pro",
            value: 15,
            icon: "../src/assets/images/icon-pro.svg",
            selected: false,
        },
    ];
    return (
        <Page
            title="Select your plan"
            text="You have the option of monthly or yearly billing.">
            <fieldset>
                <Group
                    ref={inpRef}
                    type="radio"
                    name="plan"
                    options={radioOptions}
                    update={updateForm}
                    styles={radioStyles}
                />
            </fieldset>
        </Page>
    );
}
/*


Arcade $9/mo
Advanced $12/mo
Pro $15/mo

*/
export function ThirdPage() {
    <Page
        title="Select your plan"
        text="You have the option of monthly or yearly billing.">
        <Group />
    </Page>;
}
