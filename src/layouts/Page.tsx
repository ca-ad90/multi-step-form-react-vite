import { ReactNode, useEffect, useRef } from "react";
import styles from "./Page.module.scss";
interface PageProps {
    title: string;
    text: string;
    open: boolean;
    children: ReactNode;
}

export default function Page(props: PageProps) {
    const { title, text, open, children } = props;
    const header = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (open && header.current) {
            header.current.focus();
        }
    }, [open, title]);
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
