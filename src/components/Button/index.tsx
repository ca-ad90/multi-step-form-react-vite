import { ReactNode } from "react";
import style from "./Button.module.scss";
export interface ButtonProps {
    secondary?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    children?: ReactNode;
}
export const Button = ({
    secondary,
    type = "button",
    onClick,
    disabled,
    children,
}: ButtonProps) => {
    return (
        <button
            data-type={secondary ? "secondary" : "primary"}
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={style.button}>
            <span>{children}</span>
        </button>
    );
};
