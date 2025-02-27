import { ReactNode, useEffect, useRef, useState, useContext } from "react";
import styles from "./Page.module.scss";
import { CheckBoxGroup, Input, RadioGroup, Switch } from "../Inputs";
import { FormContext } from "../../contexts/formContext";
import s from "./SummaryPage.module.scss";
import { useSessionStorage } from "../../hooks/useSessionStorageHook";
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
    console.log("email", email, re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase()) || email.trim() === "";
}

function validatePhone(phone: string) {
    const re = /^(\+\d{1,2}\s?-?)?(\d\s?)*\d$/;
    console.log("phone", phone, re.test(String(phone).toLowerCase()));
    return re.test(String(phone).toLowerCase());
}
const validation: {
    [key: string]: (v: string) => { msg: string; valid: boolean };
} = {
    email: (value: string) => {
        console.log("type:email", value);
        const valid = validateEmail(value);
        const msg = "Please enter a valid email";
        console.log(valid, msg);
        return { valid: valid, msg: msg };
    },
    phone: (value: string) => {
        if (!value) {
            return { valid: true, msg: "" };
        }
        console.log("type:phone", value);
        const valid = validatePhone(value);
        const msg = "Please enter a valid phone number";
        console.log(valid, msg);
        return { valid: valid, msg: msg };
    },
};
export function FirstPage() {
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
                label={"Name"}
                placeholder="e.g. Stephen King"
                required={true}
            />

            <Input
                name={"email"}
                type={"email"}
                label={"Email Address"}
                customValidation={validation.email}
                placeholder="e.g. stephenking@lorem.com"
                required={true}
            />
            <Input
                name={"phone"}
                type={"phone"}
                customValidation={validation.phone}
                label={"Phone Number"}
                placeholder="e.g. +1
234 567 890 Next Step "
                required={true}
            />
        </Page>
    );
}
export function SecondPage() {
    const defaultRadioOptions = [
        {
            label: "Arcade",
            value: [9, 90],
            icon: "../src/assets/images/icon-arcade.svg",
        },
        {
            label: "Advanced",
            value: [12, 120],
            icon: "../src/assets/images/icon-advanced.svg",
        },
        {
            label: "Pro",
            value: [15, 150],
            icon: "../src/assets/images/icon-pro.svg",
        },
    ];

    const defaultSwitchOptions = [
        { label: "Monthly", value: "m" },
        { label: "Yearly", value: "y" },
    ];

    return (
        <Page
            title="Select your plan"
            text="You have the option of monthly or yearly billing.">
            <RadioGroup name="plan" options={defaultRadioOptions} required />
            <fieldset>
                <Switch name="time" options={defaultSwitchOptions} />
            </fieldset>
        </Page>
    );
}
export function ThirdPage() {
    const defaultOptions: {
        label: string;
        text: string;
        value: number[];
        selected: boolean;
    }[] = [
        {
            label: "Online service",
            text: "Access to multiplayer games",
            value: [1, 10],
            selected: false,
        },
        {
            label: "Larger storage",
            text: "Extra 1TB of cloud save",
            value: [2, 20],
            selected: false,
        },
        {
            label: "Customizable Profile",
            text: "Custom theme on your profile",
            value: [2, 20],
            selected: false,
        },
    ];
    return (
        <Page
            title="Pick add-ons "
            text="Add-ons help enhance your gaming experience.">
            <CheckBoxGroup name="addon" options={defaultOptions} />
        </Page>
    );
}
export function SummaryPage() {
    const [timeValue]: string[] = useSessionStorage("time");
    const [planValue]: { [key: string]: number[] }[] =
        useSessionStorage("plan");
    const [addonValue]: Record<string, [number, number]>[] =
        useSessionStorage("addon");
    const [sum, setSum] = useState(0);
    const { formPage, setFormPage } = useContext(FormContext);
    useEffect(() => {
        console.log("formPage", formPage);
    }, [formPage]);

    useEffect(() => {
        let currentSum = 0;
        console.log(planValue, addonValue);
        if (planValue && typeof planValue === "object") {
            const planValues = Object.values(planValue)[0];
            if (planValues.length > 0 && typeof planValues[0] === "number") {
                currentSum += timeValue == "m" ? planValues[0] : planValues[1];
            }
        }
        if (addonValue && typeof addonValue === "object") {
            Object.values(addonValue).forEach((value: unknown) => {
                if (Array.isArray(value) && value.length === 2) {
                    const [month, year] = value;
                    if (typeof month === "number" && typeof year === "number") {
                        currentSum += timeValue === "m" ? month : year;
                    }
                }
            });
        }
        setSum(currentSum);
    }, [planValue, addonValue, timeValue]);
    return (
        <Page
            title="Finishing up"
            text="Double-check everything looks OK before confirming.">
            <div className={["bg-secondary", "pv-20", "ph-25"].join(" ")}>
                <div className={[s.grid_container, s.line].join(" ")}>
                    <p
                        className={[
                            "fs-m",
                            "fw-b",
                            "clr-blue-dark",
                            "fs-base",
                            s.col_4,
                        ].join(" ")}>
                        {planValue && Object.entries(planValue)[0][0]} (
                        {timeValue == "m" ? "Monthly" : "Yearly"})
                    </p>
                    <p
                        className={[
                            "link",
                            "clr-gray",
                            "fs-sl",
                            s.col_4,
                            s.row_2,
                        ].join(" ")}>
                        <a
                            href="#"
                            style={{ lineHeight: "1em" }}
                            onClick={() => {
                                setFormPage(1);
                            }}>
                            Change
                        </a>
                    </p>
                    <p className={[s.row_span2, s.price].join(" ")}>
                        $
                        {planValue &&
                            timeValue == "y" &&
                            Object.values(planValue)[0][1] + "/ye"}
                        {planValue &&
                            timeValue == "m" &&
                            Object.values(planValue)[0][0] + "/mo"}
                    </p>
                </div>
                <div
                    className={["pt-15 fs-sl clr-gray", s.grid_container].join(
                        " ",
                    )}>
                    {addonValue &&
                        Object.entries(
                            addonValue as Record<string, [number, number]>,
                        ).map(([label, [month, year]]) => {
                            return (
                                <p key={label} className={s.row}>
                                    <span className={s.col_4}>{label}</span>
                                    <span className={s.price}>
                                        +$
                                        {timeValue === "m" && `${month}/mo`}
                                        {timeValue === "y" && `${year}/ye`}
                                    </span>
                                </p>
                            );
                        })}
                </div>
            </div>
            <div className={["pv-20", "ph-25", s.grid_container].join(" ")}>
                <p className={["pb-0-i fs-sl clr-gray", s.row].join(" ")}>
                    <span className={s.col_4}>Total per month</span>
                    <span
                        className={["clr-blue-medium fs-lg", s.price].join(
                            " ",
                        )}>
                        ${sum}/{timeValue == "m" ? "mo" : "ye"}
                    </span>
                </p>
            </div>
        </Page>
    );
}
export function ThankYou() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <h1>Thank you! </h1>
                <p style={{ textAlign: "center" }}>
                    Thanks for confirming your subscription! We hope you have
                    fun using our platform. If you ever need support, please
                    feel free to email us at support@loremgaming.com.
                </p>
            </div>
        </>
    );
}
{
    /*   {formCopy.plan && (
                <p className="summary.plan">
                    <span className="title">
                        {formCopy.plan[0]} (
                        {formCopy.time == "m" ? "Monthly" : "Yearly"})
                    </span>
                    <span className="price">
                        +${formCopy.plan[1]}/
                        {formCopy.time == "m" ? "mo" : "ye"}
                    </span>
                </p>
            )}
            {formCopy.addon &&
                formCopy.addon.map(([label, value]) => (
                    <p>
                        <span>{label}</span>{" "}
                        <span className="price">
                            +${value}/{formCopy.time == "m" ? "mo" : "ye"}
                        </span>
                    </p>
                ))} */
}
