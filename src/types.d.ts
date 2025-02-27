export type pageOptionsType = {
    label: string;
    value: string;
    icon?: string;
    text?: string;
};
export interface pageInputs {
    type: "text" | "email" | "phone" | "checkbox" | "radio" | "switch";
    required?: boolean;
    label?: string;
    name: string;
    options?: (pageOptionsType | string | number)[];
    placeholder?: string;
    text?: string;
}

export interface pageInfoType {
    title: string;
    subTitle: string;
    sideBarTitle: string;
    inputs: pageInputs[];
    classNames?: string[];
    styles?: CSSProperties;
    component?: typeof SummaryPage;
}
export interface formType {
    name: string;
    email: string;
    phone: string;
    plan: {
        name: string;
        price: number;
    };
    addon: { name: string; price: number }[];
    payment: "y" | "m";
}
