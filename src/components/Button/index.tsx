import { ReactNode, MouseEvent } from "react";
import style from "./Button.module.scss";
export interface ButtonProps {
    secondary?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    children?: ReactNode;
}
export function Button({
    secondary,
    type = "button",
    onClick,
    disabled,
    children,
}: ButtonProps) {
    return (
        <button
            tabIndex={0}
            data-type={secondary ? "secondary" : "primary"}
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={style.button}>
            <span>{children}</span>
        </button>
    );
}
